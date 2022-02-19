import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./base";

export const auction: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  G.auction.player = currentPlayer.id;
  G.auction.property = currentPlayer.position;
  ctx.events.setPhase("auction");
  ctx.events.endTurn();
};

export const buyProperty: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const field = G.fields[currentPlayer.position];
  const price = field.price || 0;
  if (currentPlayer.money < price) return INVALID_MOVE;

  field.owner = ctx.currentPlayer;
  currentPlayer.properties.push(currentPlayer.position);
  currentPlayer.money -= price;
  ctx.events.endStage();
};
