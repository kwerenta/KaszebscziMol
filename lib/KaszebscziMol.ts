import { Game } from "boardgame.io";
import { Space, spaces } from "./configs/spaces";
import Moves from "./moves";

export interface Player {
  name: string;
  color: string;
  money: number;
  position: number;
  properties: number[];
  jail: number;
}

export interface Items {
  properties: number[];
  money: number;
}

export interface GameState {
  players: Record<string, Player>;
  spaces: Space[];
  auction: {
    properties: number[];
    price: number;
    player: string;
  };
  trade: {
    source: {
      player: string;
      items: Items;
    };
    target: {
      player: string;
      items: Items;
    };
  };
  temp: { playOrder: string[]; playOrderPos: number; stage: string };
  doubles: number;
  card: number;
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

  setup: () => ({
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
      source: {
        player: "",
        items: {
          properties: [],
          money: 0,
        },
      },
      target: {
        player: "",
        items: {
          properties: [],
          money: 0,
        },
      },
    },
    spaces: spaces.map<Space>(space =>
      !space.price
        ? space
        : {
            ...space,
            mortgage: false,
            houses: 0,
            owner: "",
          }
    ),
    card: -1,
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
      isOwner: { moves: Moves.isOwner },
      hasOwner: { moves: Moves.hasOwner },
      noOwner: { moves: Moves.noOwner },
      cardSpace: { moves: Moves.cardSpace },
      cardAction: { moves: Moves.cardAction },
      tradeSetup: { moves: Moves.tradeSetup },
    },
  },
  phases: {
    auction: {
      onBegin: (G, ctx) => {
        // Save increased playOrderPos by 1
        // because global playOrderPos is set to the last player
        G.temp.playOrderPos = ctx.playOrderPos + 1;
        G.temp.playOrder = ctx.playOrder;
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
          first: (_, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
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
      onEnd: (G, _) => {
        // TEMP very repetitive
        G.trade = {
          source: {
            player: "",
            items: {
              properties: [],
              money: 0,
            },
          },
          target: {
            player: "",
            items: {
              properties: [],
              money: 0,
            },
          },
        };
      },
      turn: {
        order: {
          first: () => 1,
          next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
          playOrder: G => [G.trade.source.player, G.trade.target.player],
        },
      },
      moves: Moves.trade,
    },
  },
});
