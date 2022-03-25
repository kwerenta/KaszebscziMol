import { Move } from "boardgame.io";
import { INVALID_MOVE, Stage } from "boardgame.io/core";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./utils";

export const payFine: Move<GameState> = (G, ctx) => {
  const FINE_VALUE = 50;
  const currentPlayer = getPlayer(G, ctx);
  if (currentPlayer.money < FINE_VALUE) return INVALID_MOVE;

  currentPlayer.money -= FINE_VALUE;
  currentPlayer.jail = 0;
  ctx.events.setStage(Stage.NULL);
};
