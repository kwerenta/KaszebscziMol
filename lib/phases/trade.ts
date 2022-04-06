import { Ctx, PhaseConfig } from "boardgame.io";
import { MortgageStatus } from "../configs/spaces";
import { EMPTY_TRADE, GameState } from "../KaszebscziMol";
import Moves from "../moves";

export const trade: PhaseConfig<GameState, Ctx> = {
  onBegin: (G, ctx) => {
    G.temp.playOrderPos = ctx.playOrderPos;
    G.temp.playOrder = ctx.playOrder;
  },
  onEnd: G => {
    // TEMP Change the interest on properties already mortgaged to Interest20
    G.trade.offers.items.properties
      .concat(G.trade.wants.items.properties)
      .forEach(propertyIndex => {
        const space = G.spaces[propertyIndex];
        if (space.mortgage === MortgageStatus.Interest10)
          space.mortgage = MortgageStatus.Interest20;
      });
    G.trade = {
      offers: EMPTY_TRADE,
      wants: EMPTY_TRADE,
    };
  },
  turn: {
    onBegin: (G, ctx) => {
      const { offers, wants } = G.trade;
      if (
        offers.items.money === 0 &&
        offers.items.properties.length === 0 &&
        wants.items.money === 0 &&
        wants.items.properties.length === 0
      )
        ctx.events.setActivePlayers({
          currentPlayer: "tradeOffer",
          maxMoves: 1,
        });
    },
    order: {
      first: () => 0,
      next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
      playOrder: G => [G.trade.offers.player, G.trade.wants.player],
    },
    stages: {
      tradeOffer: { moves: Moves.tradeOffer },
    },
  },
  moves: Moves.trade,
};
