import { Move } from "boardgame.io";
import { GameState } from "../KaszebscziMol";

export const drawCard: Move<GameState> = G => {
  const card = G.card.left.pop();
  G.card = { current: card, left: G.card.left };
};
