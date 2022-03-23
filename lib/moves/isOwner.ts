import { Move, MoveFn } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Groups, Space, groups, MortgageStatus } from "../configs/spaces";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./base";

const getColorGroupSpaces = (spaces: Space[], group: Groups) =>
  spaces.filter(space => space.group === group);

const areBuiltEqually = (
  spaces: Space[],
  { houses }: Space,
  type: "buy" | "sell"
) =>
  // Check if houses will be built equally
  spaces.every(
    space => Math.abs(space.houses - (houses + (type === "buy" ? 1 : -1))) < 2
  );

export const buyHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[currentPlayer.position];
  const price = groups[space.group].housePrice;

  if (!space.price || space.mortgage !== MortgageStatus.Unmortgaged)
    return INVALID_MOVE;
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

export const sellHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[currentPlayer.position];
  const price = groups[space.group].housePrice / 2;

  // Check if there is enough houses to sell hotel
  if (space.houses === 5 && G.buildings.houses < 4) return INVALID_MOVE;
  if (!space.price || space.houses < 1) return INVALID_MOVE;

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

export const mortgage: MoveFn<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[currentPlayer.position];

  if (space.houses !== 0) return INVALID_MOVE;

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
      : space.mortgage === MortgageStatus.Interest10
      ? 1.1
      : 1;
  const unmortgageCost = mortgageValue * interest;

  if (currentPlayer.money < unmortgageCost) return INVALID_MOVE;

  currentPlayer.money -= unmortgageCost;
  space.mortgage = MortgageStatus.Unmortgaged;
};
