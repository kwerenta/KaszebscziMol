import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Space, groups, MortgageStatus, Group } from "../configs/spaces";
import { GameState } from "../KaszebscziMol";
import { getColorGroupSpaces, getPlayer } from "./utils";

const isIndexOk = (propertyIndex: number) =>
  typeof propertyIndex === "number" && propertyIndex >= 0;

const areBuiltEqually = (
  spaces: Space[],
  { houses }: Space,
  type: "buy" | "sell"
) =>
  // Check if houses will be built equally
  spaces.every(
    space => Math.abs(space.houses - (houses + (type === "buy" ? 1 : -1))) < 2
  );

export const buyHouse: Move<GameState> = (G, ctx, propertyIndex: number) => {
  if (!isIndexOk(propertyIndex)) return INVALID_MOVE;

  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[propertyIndex];
  const group: Group = groups[space.group];
  const price = group.housePrice;

  if (!space.price || price === 0 || space.owner !== ctx.currentPlayer)
    return INVALID_MOVE;
  if (space.mortgage !== MortgageStatus.Unmortgaged) return INVALID_MOVE;
  if (currentPlayer.money < price || space.houses > 4) return INVALID_MOVE;
  // Check if there is enough buildings left
  if (
    (space.houses < 4 && G.buildings.houses === 0) ||
    (space.houses === 4 && G.buildings.hotels === 0)
  )
    return INVALID_MOVE;

  const colorGroupSpaces = getColorGroupSpaces(G.spaces, space.group);

  // Check if player owns all the properties in the color group
  // and that none of them are mortgaged
  if (
    !colorGroupSpaces.every(
      s =>
        s.owner === ctx.currentPlayer &&
        s.mortgage === MortgageStatus.Unmortgaged
    )
  )
    return INVALID_MOVE;

  if (!areBuiltEqually(colorGroupSpaces, space, "buy")) return INVALID_MOVE;

  space.houses++;

  if (space.houses === 5) {
    G.buildings.houses += 4;
    G.buildings.hotels--;
  } else {
    G.buildings.houses--;
  }

  currentPlayer.money -= price;
};

export const sellHouse: Move<GameState> = (G, ctx, propertyIndex: number) => {
  if (!isIndexOk(propertyIndex)) return INVALID_MOVE;

  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[propertyIndex];
  const price = groups[space.group].housePrice / 2;

  if (!space.price || space.owner !== ctx.currentPlayer || space.houses < 1)
    return INVALID_MOVE;
  // Check if there is enough houses to sell hotel
  if (space.houses === 5 && G.buildings.houses < 4) return INVALID_MOVE;

  const colorGroupSpaces = getColorGroupSpaces(G.spaces, space.group);
  if (!areBuiltEqually(colorGroupSpaces, space, "sell")) return INVALID_MOVE;

  if (space.houses === 5) {
    G.buildings.hotels++;
    G.buildings.houses -= 4;
  } else {
    G.buildings.houses++;
  }

  space.houses--;
  currentPlayer.money += price;
};

export const mortgage: Move<GameState> = (G, ctx, propertyIndex: number) => {
  if (!isIndexOk(propertyIndex)) return INVALID_MOVE;

  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[propertyIndex];

  if (!space.price || space.owner !== ctx.currentPlayer || space.houses !== 0)
    return INVALID_MOVE;

  // Mortgage property
  const mortgageValue = space.price / 2;
  if (space.mortgage === MortgageStatus.Unmortgaged) {
    currentPlayer.money += mortgageValue;
    space.mortgage = MortgageStatus.Interest10;
    return;
  }

  // Unmortgage property
  const interest =
    space.mortgage === MortgageStatus.Interest20
      ? 1.2
      : space.mortgage === MortgageStatus.Interest10 ||
        space.mortgage === MortgageStatus.Interest10To20
      ? 1.1
      : 1;
  const unmortgageCost = mortgageValue * interest;

  if (currentPlayer.money < unmortgageCost) return INVALID_MOVE;

  currentPlayer.money -= unmortgageCost;
  space.mortgage = MortgageStatus.Unmortgaged;
};
