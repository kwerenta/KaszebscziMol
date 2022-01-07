import { Move } from "boardgame.io";
import { cards } from "../configs/cards";
import { GameState } from "../KaszebscziMol";

export const drawCard: Move<GameState> = (G, ctx) => {
  const card = ctx.random ? ctx.random?.Die(cards.length) - 1 : -1;
  G.card = card;
};
