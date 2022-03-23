import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { PropertyGroups } from "../configs/spaces";
import { GameState } from "../KaszebscziMol";
import { getPlayer } from "./base";

export const pay: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);
  const space = G.spaces[currentPlayer.position];

  if (!space.price) return INVALID_MOVE;

  const ownerPlayer = G.players[space.owner];
  let rent = space.rent[space.houses];

  if (space.group === PropertyGroups.Utility) {
    // Check if player owns all Utility properties
    const ownsAllUtilities = G.spaces.every(
      s => s.group !== PropertyGroups.Utility || s.owner === space.owner
    );

    // Multiply sum of dice depending on whether player owns all Utilities
    rent = (G.dice[0] + G.dice[1]) * (ownsAllUtilities ? 10 : 4);
  }

  if (currentPlayer.money < rent) return INVALID_MOVE;

  currentPlayer.money -= rent;
  ownerPlayer.money += rent;
  ctx.events.endTurn();
};
