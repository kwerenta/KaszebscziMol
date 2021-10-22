import { Game } from "boardgame.io";
import { Field, fields } from "./configs/fields";
import {
  acceptCard,
  auction,
  bid,
  buyHouse,
  buyProperty,
  defaultActions,
  drawCard,
  pass,
  pay,
  rollDice,
  sellHouse,
} from "./moves";

export interface Player {
  id: string;
  name: string;
  money: number;
  position: number;
  properties: number[];
  jail: number;
  bankrupt: boolean;
}

export interface GameState {
  players: Player[];
  fields: Field[];
  auction: {
    property: number;
    price: number;
    player: string;
    playOrder: string[];
    playOrderPos: number;
  };
  doubles: number;
  card: number;
}

export const KaszebscziMol: Game<GameState> = {
  name: "KaszëbscziMôl",
  minPlayers: 2,
  maxPlayers: 6,
  disableUndo: true,

  setup: ctx => ({
    players: ctx.playOrder.map(id => ({
      id,
      name: `Gracz${id}`,
      money: 1500,
      position: 0,
      properties: [],
      jail: 0,
      bankrupt: false,
    })),
    auction: {
      price: 0,
      player: "",
      property: -1,
      playOrder: [],
      playOrderPos: -1,
    },
    fields,
    card: -1,
    doubles: 0,
  }),

  moves: {
    rollDice,
  },

  turn: {
    minMoves: 1,
    order: {
      first: G =>
        G.auction.playOrderPos === -1
          ? 0
          : (G.auction.playOrderPos + 1) % G.auction.playOrder.length,
      next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
      playOrder: (G, ctx) =>
        G.auction.playOrder.length
          ? G.auction.playOrder
          : ctx.random?.Shuffle(ctx.playOrder) ?? [],
    },
    stages: {
      noAction: {
        moves: {
          ...defaultActions,
        },
      },
      isOwner: { moves: { ...defaultActions, buyHouse, sellHouse } },
      hasOwner: { moves: { pay } },
      noOwner: { moves: { buyProperty, auction } },
      cardField: { next: "noAction", moves: { drawCard, acceptCard } },
    },
  },
  phases: {
    auction: {
      onBegin: (G, ctx) => {
        G.auction.playOrder = ctx.playOrder;
        G.auction.playOrderPos = ctx.playOrderPos;
      },
      endIf: (_, ctx) => ctx.playOrder.length === 1,
      onEnd: G => {
        const winner = G.players[parseInt(G.auction.player)];
        const property = G.fields[G.auction.property];

        property.owner = winner.id;
        winner.money -= G.auction.price;
        winner.properties.push(G.auction.property);

        G.auction = {
          ...G.auction,
          price: 0,
          player: "",
          property: -1,
        };
      },
      turn: {
        order: {
          first: (_, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
          next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length,
          playOrder: (_, ctx) => ctx.playOrder,
        },
      },
      moves: {
        bid,
        pass,
      },
    },
  },
};
