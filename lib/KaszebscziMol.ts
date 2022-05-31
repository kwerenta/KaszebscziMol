import { Ctx, Game } from "boardgame.io";
import { cards } from "./configs/cards";
import { MortgageStatus, Space, spaces } from "./configs/spaces";
import Moves, { Stages } from "./moves";
import * as Phases from "./phases/";

export interface PlayerData {
  name: string;
  color: string;
}

export type SetupData = PlayerData[];

export interface Player extends PlayerData {
  money: number;
  position: number;
  properties: number[];
  jail: number;
  jailCards: number[];
  isBankrupt: boolean;
}

export interface TradeItems {
  properties: number[];
  money: number;
}

export interface Trade {
  player: string;
  items: TradeItems;
}

export const EMPTY_TRADE: Trade = {
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
  temp: {
    playOrder: string[];
    playOrderPos: number;
    stage: Stages | "";
    updateInterest: boolean;
  };
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

export const KaszebscziMol: Game<GameState, Ctx, SetupData> = {
  name: "KaszëbscziMôl",
  minPlayers: 2,
  maxPlayers: 6,
  disableUndo: true,

  setup: (ctx, setupData) => ({
    players: Object.fromEntries<Player>(
      setupData.map((playerData, index): [number, Player] => [
        index,
        {
          name: playerData.name,
          color: playerData.color,
          money: 1500,
          position: 0,
          properties: [],
          jail: 0,
          jailCards: [],
          isBankrupt: false,
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
      updateInterest: false,
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
    onEnd: (G, ctx) => {
      if (G.temp.updateInterest) {
        const player = G.players[ctx.currentPlayer];
        player.properties.forEach(propertyIndex => {
          const space = G.spaces[propertyIndex];
          space.mortgage =
            space.mortgage === MortgageStatus.Interest0To10
              ? MortgageStatus.Interest10
              : space.mortgage === MortgageStatus.Interest10To20
              ? MortgageStatus.Interest20
              : space.mortgage;
        });

        G.temp.updateInterest = G.spaces.some(
          space =>
            space.mortgage === MortgageStatus.Interest0To10 ||
            space.mortgage === MortgageStatus.Interest10To20
        );
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
          : G.temp.playOrder.filter(id => !G.players[id].isBankrupt),
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
    auction: Phases.auction,
    trade: Phases.trade,
  },
};
