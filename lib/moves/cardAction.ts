import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { cards } from "../configs/cards";
import { GameState } from "../KaszebscziMol";
import { getPlayer, goToJail } from "./general";

export const acceptCard: Move<GameState> = (G, ctx) => {
  const currentPlayer = getPlayer(G, ctx);

  const currentCard = cards[G.card];

  switch (currentCard.action) {
    case "add":
      currentPlayer.money += currentCard.amount;
      break;

    case "substract":
      if (currentPlayer.money < currentCard.amount) return INVALID_MOVE;
      currentPlayer.money -= currentCard.amount;
      break;

    case "payAll":
      const amount = ctx.playOrder.length * currentCard.amount;
      if (currentPlayer.money < amount) return INVALID_MOVE;
      ctx.playOrder.forEach(id => {
        if (id === ctx.currentPlayer) currentPlayer.money -= amount;
        else G.players[id].money += currentCard.amount;
      });
      break;
    case "getAll":
      ctx.playOrder.forEach(id => {
        if (id === ctx.currentPlayer) {
          currentPlayer.money += ctx.playOrder.length * currentCard.amount;
        } else {
          const player = G.players[id];

          if (player.money < currentCard.amount) {
            console.log(`Error! Player ${id} has not enough money`);
            return INVALID_MOVE;
          }
          player.money -= currentCard.amount;
        }
      });
      break;
    case "goToJail":
      goToJail(currentPlayer, ctx);
      break;
  }

  // set current card to none
  G.card = -1;

  ctx.events.setStage("noAction");
};
