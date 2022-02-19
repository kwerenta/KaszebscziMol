import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./base";

export const pay: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const ownerPlayer = G.players[G.fields[currentPlayer.position].owner];

  const field = G.fields[currentPlayer.position];
  const currentRent = field.rent?.[field.houses ? field.houses : 0] || 0;
  if (currentPlayer.money < currentRent) return INVALID_MOVE;

  currentPlayer.money -= currentRent;
  ownerPlayer.money += currentRent;
};
