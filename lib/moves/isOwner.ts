import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Groups, Space, groups } from "../configs/spaces";
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

  if (!space.price || space.mortgage === false) return INVALID_MOVE;
  if (currentPlayer.money < price || space.houses > 4) return INVALID_MOVE;

  const colorGroupSpaces = getColorGroupSpaces(G.spaces, space.group);

  // Check if player own all of the properties in a color group
  if (!colorGroupSpaces.every(s => s.owner === space.owner))
    return INVALID_MOVE;

  if (!areBuiltEqually(colorGroupSpaces, space, "buy")) return INVALID_MOVE;

  space.houses++;
  currentPlayer.money -= price;
  ctx.events.setStage("noAction");
};

export const sellHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[currentPlayer.position];
  const price = groups[space.group].housePrice / 2;

  if (!space.price || space.houses < 1) return INVALID_MOVE;

  const colorGroupSpaces = getColorGroupSpaces(G.spaces, space.group);
  if (!areBuiltEqually(colorGroupSpaces, space, "sell")) return INVALID_MOVE;

  space.houses--;
  currentPlayer.money += price;
  ctx.events.setStage("noAction");
};
