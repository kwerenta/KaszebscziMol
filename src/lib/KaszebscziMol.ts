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
}

export interface GameState {
  players: Player[];
  fields: Field[];
  auction: {
    property: number;
    price: number;
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
    })),
    auction: {
      price: 0,
      property: -1,
    },
    fields,
    card: -1,
    doubles: 0,
  }),

  moves: {
    rollDice,
  },

  turn: {
    order: {
      first: () => 0,
      next: (_, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
      playOrder: (_, ctx) => ctx.random?.Shuffle(ctx.playOrder) ?? [],
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
      auction: { moves: { bid, skip: (_, ctx) => ctx.events?.endTurn() } },
    },
  },
};
