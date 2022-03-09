import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./base";

export const pay: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[currentPlayer.position];

  if (!space.price) return INVALID_MOVE;

  const ownerPlayer = G.players[space.owner];
  const currentRent = space.rent[space.houses];

  if (currentPlayer.money < currentRent) return INVALID_MOVE;

  currentPlayer.money -= currentRent;
  ownerPlayer.money += currentRent;
  ctx.events.endTurn();
};
