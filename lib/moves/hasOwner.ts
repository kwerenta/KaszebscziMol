import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { PropertyGroups } from "../configs/spaces";
import { GameState } from "../KaszebscziMol";
import { getColorGroupSpaces, getPlayer } from "./utils";

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
  } else if (space.group === PropertyGroups.Train) {
    // Count how many Stations owner player has
    const trainCount = G.spaces.reduce(
      (count, s) =>
        s.group === PropertyGroups.Train && s.owner === space.owner
          ? count + 1
          : count,
      0
    );
    rent = space.rent[trainCount - 1];
  }
  // Check if player owns all the properties in the color set
  // and none of them have buildings, then double the rent
  else if (
    getColorGroupSpaces(G.spaces, space.group).every(
      s => s.owner === ctx.currentPlayer && s.houses === 0
    )
  ) {
    rent *= 2;
  }

  if (currentPlayer.money < rent) return INVALID_MOVE;

  currentPlayer.money -= rent;
  ownerPlayer.money += rent;
  ctx.events.endTurn();
};
