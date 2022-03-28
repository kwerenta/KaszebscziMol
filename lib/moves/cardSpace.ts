import { Move } from "boardgame.io";
import { cards } from "../configs/cards";
import { GameState } from "../KaszebscziMol";

export const drawCard: Move<GameState> = (G, ctx) => {
  const card = G.card.left.pop();
  G.card = { current: card, left: G.card.left };

  if (G.card.left.length === 0) {
    const usedJailCards = Object.values(G.players).reduce<number[]>(
      (jailCards, player) => jailCards.concat(player.jailCards),
      []
    );

    if (cards[card].action === "getJailCard") {
      usedJailCards.unshift(card);
    }

    G.card.left = ctx.random.Shuffle(
      cards.reduce<number[]>(
        (cards, _, index) =>
          usedJailCards.includes(index) ? cards : [...cards, index],
        []
      )
    );
  }
};
