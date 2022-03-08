import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Groups, Field, groups } from "../configs/fields";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./base";

const getColorGroupFields = (fields: Field[], group: Groups) =>
  fields.filter(f => f.group === group);

const areBuiltEqually = (
  fields: Field[],
  { houses }: Field,
  type: "buy" | "sell"
) =>
  // Check if houses will be built equally
  fields.every(
    f => Math.abs(f.houses - (houses + (type === "buy" ? 1 : -1))) < 2
  );

export const buyHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = groups[field.group].housePrice;

  if (field.mortgage === false) return INVALID_MOVE;
  if (currentPlayer.money < price || field.houses > 4) return INVALID_MOVE;

  const colorGroupFields = getColorGroupFields(G.fields, field.group);

  // Check if player own all of the properties in a color group
  if (!colorGroupFields.every(f => f.owner === field.owner))
    return INVALID_MOVE;

  if (!areBuiltEqually(colorGroupFields, field, "buy")) return INVALID_MOVE;

  field.houses++;
  currentPlayer.money -= price;
  ctx.events.setStage("noAction");
};

export const sellHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = groups[field.group].housePrice / 2;

  if (field.houses < 1) return INVALID_MOVE;

  const colorGroupFields = getColorGroupFields(G.fields, field.group);
  if (!areBuiltEqually(colorGroupFields, field, "sell")) return INVALID_MOVE;

  field.houses--;
  currentPlayer.money += price;
  ctx.events.setStage("noAction");
};
