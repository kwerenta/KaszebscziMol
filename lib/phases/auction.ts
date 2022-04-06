import { Ctx, PhaseConfig } from "boardgame.io";
import { GameState } from "../KaszebscziMol";
import Moves from "../moves";

export const auction: PhaseConfig<GameState, Ctx> = {
  onBegin: (G, ctx) => {
    G.temp.playOrderPos = ctx.playOrderPos;
    G.temp.playOrder = ctx.playOrder;

    // Check if this space has been put up for auction
    // Then set temp stage to let last player end his turn
    if (G.spaces[G.auction.properties[0]].owner === "")
      G.temp.stage = "noAction";
  },
  endIf: (_, ctx) => ctx.playOrder.length === 1,
  onEnd: G => {
    const winner = G.players[G.auction.player];

    G.auction.properties.forEach(propertyIndex => {
      G.spaces[propertyIndex].owner = G.auction.player;
    });

    winner.money -= G.auction.price;
    winner.properties = winner.properties.concat(G.auction.properties);

    G.auction = {
      ...G.auction,
      price: 0,
      player: "",
      properties: [],
    };
  },
  turn: {
    order: {
      first: (G, ctx) =>
        // If auction is due to bankruptcy, set first position
        // to current position due to change in playOrder
        G.spaces[G.auction.properties[0]].owner !== ""
          ? ctx.playOrderPos
          : (ctx.playOrderPos + 1) % ctx.playOrder.length,
      next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
      playOrder: (_, ctx) => ctx.playOrder,
    },
  },
  moves: Moves.auction,
};
