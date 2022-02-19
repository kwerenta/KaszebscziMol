import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./general";

export const bid: Move<GameState> = (G, ctx, amount: number) => {
  const currentPlayer = getPlayer(G, ctx);
  if (!amount || G.auction.price + amount > currentPlayer.money)
    return INVALID_MOVE;
  G.auction.player = currentPlayer.id;
  G.auction.price += amount;
  ctx.events.endTurn();
};

export const pass: Move<GameState> = (_, ctx) => {
  ctx.events.pass({ remove: true });
};
