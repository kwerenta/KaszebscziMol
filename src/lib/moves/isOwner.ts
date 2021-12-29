import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { groups } from "../configs/fields";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./general";

export const buyHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = groups[field.group || 0].mortgage;

  if (currentPlayer.money < price || (field.houses && field.houses > 4))
    return INVALID_MOVE;

  field.houses ? field.houses++ : (field.houses = 1);
  currentPlayer.money -= price;
  ctx.events?.setStage("noAction");
};

export const sellHouse: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = groups[field.group || 0].mortgage / 2;

  if (field.houses && field.houses < 1) return INVALID_MOVE;

  field.houses ? field.houses-- : (field.houses = 0);
  currentPlayer.money += price;
  ctx.events?.setStage?.("noAction");
};
