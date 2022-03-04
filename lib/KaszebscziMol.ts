import { Game } from "boardgame.io";
import { Field, fields } from "./configs/fields";
import Moves from "./moves";

export interface Player {
  id: string;
  name: string;
  color: string;
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
    player: string;
    playOrder: string[];
    playOrderPos: number;
  };
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
    players: setupData.map((playerData, index) => ({
      id: String(index),
      name: playerData.name,
      color: playerData.color,
      money: 1500,
      position: 0,
      properties: [],
      jail: 0,
    })),
    auction: {
      price: 0,
      player: "",
      property: -1,
      playOrder: [],
      playOrderPos: -1,
    },
    fields: fields.map<Field>(field => ({
      ...field,
      mortgage: false,
      houses: 0,
      owner: "",
    })),
    card: -1,
    doubles: 0,
    bankrupts: 0,
    dice: [0, 0],
  }),

  moves: Moves.rollDice,

  endIf: (G, ctx) => ctx.numPlayers - 1 === G.bankrupts,

  turn: {
    minMoves: 1,
    order: {
      first: G =>
        G.auction.playOrderPos === -1
          ? 0
          : (G.auction.playOrderPos + 1) % G.auction.playOrder.length,
      next: (G, ctx) =>
        G.doubles > 0
          ? ctx.playOrderPos
          : (ctx.playOrderPos + 1) % ctx.playOrder.length,
      playOrder: (G, ctx) =>
        G.auction.playOrder.length
          ? G.auction.playOrder
          : ctx.random?.Shuffle(ctx.playOrder) ?? [],
    },
    stages: {
      noAction: { moves: Moves.noAction },
      isOwner: { moves: Moves.isOwner },
      hasOwner: { moves: Moves.hasOwner },
      noOwner: { moves: Moves.noOwner },
      cardField: { moves: Moves.cardField },
      cardAction: { moves: Moves.cardAction },
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
      moves: Moves.auction,
    },
  },
});
