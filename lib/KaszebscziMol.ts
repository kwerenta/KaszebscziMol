import { Game } from "boardgame.io";
import { Stage } from "boardgame.io/dist/types/packages/core";
import { cards } from "./configs/cards";
import { MortgageStatus, Space, spaces } from "./configs/spaces";
import Moves, { Stages } from "./moves";

export interface Player {
  name: string;
  color: string;
  money: number;
  position: number;
  properties: number[];
  jail: number;
}

export interface TradeItems {
  properties: number[];
  money: number;
}

export interface Trade {
  player: string;
  items: TradeItems;
}

const EMPTY_TRADE: Trade = {
  player: "",
  items: {
    properties: [],
    money: 0,
  },
};

export interface GameState {
  players: Record<string, Player>;
  spaces: Space[];
  auction: {
    properties: number[];
    price: number;
    player: string;
  };
  trade: Record<"offers" | "wants", Trade>;
  temp: { playOrder: string[]; playOrderPos: number; stage: Stages | "" };
  doubles: number;
  card: {
    current: number;
    left: number[];
  };
  buildings: {
    houses: number;
    hotels: number;
  };
  bankrupts: number;
  dice: [number, number];
}

export interface playerData {
  name: string;
  color: string;
}
export const KaszebscziMol = (setupData: playerData[]): Game<GameState> => ({
  name: "KaszëbscziMôl",
  minPlayers: 2,
  maxPlayers: 6,
  disableUndo: true,

  setup: ctx => ({
    players: Object.fromEntries(
      setupData.map((playerData, index) => [
        index,
        {
          name: playerData.name,
          color: playerData.color,
          money: 1500,
          position: 0,
          properties: [],
          jail: 0,
        },
      ])
    ),
    auction: {
      price: 0,
      player: "",
      properties: [],
    },
    temp: {
      playOrder: [],
      playOrderPos: -1,
      stage: "",
    },
    trade: {
      offers: EMPTY_TRADE,
      wants: EMPTY_TRADE,
    },
    spaces: spaces.map<Space>(space =>
      !space.price
        ? space
        : {
            ...space,
            mortgage: MortgageStatus.Unmortgaged,
            houses: 0,
            owner: "",
          }
    ),
    card: {
      current: -1,
      left: ctx.random.Shuffle(cards.map((_, index) => index)),
    },
    buildings: {
      hotels: 12,
      houses: 32,
    },
    doubles: 0,
    bankrupts: 0,
    dice: [0, 0],
  }),

  playerView: G => {
    const state = { ...G };
    delete state.temp;
    return state;
  },

  moves: Moves.rollDice,

  endIf: (G, ctx) => ctx.numPlayers - 1 === G.bankrupts,

  turn: {
    onBegin: (G, ctx) => {
      if (G.players[ctx.currentPlayer].jail > 0) {
        ctx.events.setActivePlayers({ currentPlayer: "inJail" });
        return;
      }
      if (G.temp.stage !== "") {
        ctx.events.setActivePlayers({ currentPlayer: G.temp.stage });
        G.temp.stage = "";
      }
    },
    minMoves: 1,
    order: {
      first: G =>
        G.temp.playOrderPos === -1
          ? 0
          : G.temp.playOrderPos % G.temp.playOrder.length,
      next: (G, ctx) =>
        G.doubles > 0
          ? ctx.playOrderPos
          : (ctx.playOrderPos + 1) % ctx.playOrder.length,
      playOrder: (G, ctx) =>
        G.temp.playOrderPos === -1
          ? ctx.random.Shuffle(ctx.playOrder)
          : G.temp.playOrder,
    },
    stages: {
      noAction: { moves: Moves.noAction },
      hasOwner: { moves: Moves.hasOwner },
      noOwner: { moves: Moves.noOwner },
      cardSpace: { moves: Moves.cardSpace },
      cardAction: { moves: Moves.cardAction },
      tradeSetup: { moves: Moves.tradeSetup },
      propertyManagment: { moves: Moves.propertyManagment },
      inJail: { moves: Moves.inJail },
    },
  },
  phases: {
    auction: {
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
    },
    trade: {
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
        onBegin: (_, ctx) => {
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
    },
  },
});
