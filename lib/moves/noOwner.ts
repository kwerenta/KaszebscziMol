import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./utils";

export const auction: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  G.auction.player = ctx.currentPlayer;
  G.auction.properties = [currentPlayer.position];
  ctx.events.setPhase("auction");
};

export const buyProperty: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[currentPlayer.position];
  const price = space.price;
  if (!price || currentPlayer.money < price) return INVALID_MOVE;

  space.owner = ctx.currentPlayer;
  currentPlayer.properties.push(currentPlayer.position);
  currentPlayer.money -= price;
  ctx.events.setStage("noAction");
};
