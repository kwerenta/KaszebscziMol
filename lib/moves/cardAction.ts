import { Move } from "boardgame.io";
import { INVALID_MOVE, Stage } from "boardgame.io/core";
import { cards } from "../configs/cards";
import { GameState } from "../KaszebscziMol";
import { getPlayer, goToJail } from "./base";

export const acceptCard: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);

  const { payload, action } = cards[G.card];

  let nextStage = "noAction";

  switch (action) {
    case "collect":
      currentPlayer.money += payload;
      break;

    case "pay":
      if (currentPlayer.money < payload) return INVALID_MOVE;
      currentPlayer.money -= payload;
      break;

    case "payEachPlayer":
      const amount = (ctx.playOrder.length - 1) * payload;
      if (currentPlayer.money < amount) return INVALID_MOVE;
      ctx.playOrder.forEach(id => {
        if (id === ctx.currentPlayer) currentPlayer.money -= amount;
        else G.players[id].money += payload;
      });
      break;

    case "collectFromEveryPlayer":
      Object.entries(G.players).forEach(([id, player]) => {
        if (id === ctx.currentPlayer) {
          currentPlayer.money += (ctx.playOrder.length - 1) * payload;
          return;
        }

        if (player.money < payload) return INVALID_MOVE;

        player.money -= payload;
      });
      break;

    case "advanceToNearest":
      const numOfSpaces = G.spaces.length;
      const distanceToNearestSpace = G.spaces.reduce(
        (shortestDistance, space, index) => {
          if (space.group !== payload) return shortestDistance;
          return Math.min(
            (index + numOfSpaces - currentPlayer.position) % numOfSpaces,
            shortestDistance
          );
        },
        numOfSpaces
      );
      let newPosition = currentPlayer.position + distanceToNearestSpace;

      if (newPosition > 39) {
        currentPlayer.money += 200;
        newPosition -= 40;
      }

      currentPlayer.position = newPosition;

      const currentSpace = G.spaces[currentPlayer.position];
      nextStage = !currentSpace.price
        ? "noAction"
        : currentSpace.owner === ""
        ? "noOwner"
        : currentSpace.owner === ctx.currentPlayer
        ? "isOwner"
        : "hasOwner";
      break;

    case "goToJail":
      goToJail(currentPlayer, ctx);
      break;
  }

  // set current card to none
  G.card = -1;

  ctx.events.setStage(nextStage);
};
