import { rollDice, bankrupt, endTurn, trade, manageProperties } from "./base";
import { buyHouse, mortgage, sellHouse } from "./propertyManagment";
import { pay } from "./hasOwner";
import { bid, withdraw } from "./auction";
import { acceptCard } from "./cardAction";
import { drawCard } from "./cardSpace";
import { auction, buyProperty } from "./noOwner";
import type { GameState } from "../KaszebscziMol";
import type { Ctx, Move } from "boardgame.io";
import { acceptOffer, selectPlayer, makeOffer, rejectOffer } from "./trade";

export interface moveData {
  text: string;
  color: "green" | "red" | "orange";
}
const createMovesDataMap = <T extends { [name: string]: moveData }>(map: T) =>
  map;
export const movesData = createMovesDataMap({
  rollDice: {
    text: "Rzuć kostką",
    color: "green",
  },
  bankrupt: {
    text: "Ogłoś bankructwo",
    color: "red",
  },
  endTurn: {
    text: "Zakończ turę",
    color: "orange",
  },
  manageProperties: {
    text: "Zarządzaj nieruchomościami",
    color: "green",
  },
  buyHouse: {
    text: "Kup dom",
    color: "green",
  },
  sellHouse: {
    text: "Sprzedaj dom",
    color: "red",
  },
  mortgage: {
    text: "Oddaj w zastaw",
    color: "orange",
  },
  pay: {
    text: "Zapłać czynsz",
    color: "orange",
  },
  buyProperty: {
    text: "Kup nieruchomość",
    color: "green",
  },
  auction: {
    text: "Wystaw na licytację",
    color: "orange",
  },
  drawCard: {
    text: "Weź kartę",
    color: "green",
  },
  acceptCard: {
    text: "Akceptuj",
    color: "green",
  },
  bid: {
    text: "Licytuj",
    color: "orange",
  },
  withdraw: {
    text: "Wycofaj się",
    color: "red",
  },
  trade: {
    text: "Wymiana",
    color: "green",
  },
  selectPlayer: {
    text: "Wybierz gracza",
    color: "green",
  },
  makeOffer: {
    text: "Złóż ofertę",
    color: "green",
  },
  acceptOffer: {
    text: "Akceptuj ofertę",
    color: "green",
  },
  rejectOffer: {
    text: "Odrzuć ofertę",
    color: "red",
  },
});
export type movesMap = keyof typeof movesData;

const defaultMoves = { manageProperties, trade, bankrupt };

const createMovesMap = <
  T extends { [name: string]: Partial<Record<movesMap, Move<GameState, Ctx>>> }
>(
  map: T
) => map;
const Moves = createMovesMap({
  rollDice: { rollDice },
  noAction: { endTurn, ...defaultMoves },
  hasOwner: { pay, ...defaultMoves },
  noOwner: { buyProperty, auction, manageProperties, trade },
  cardSpace: { drawCard },
  cardAction: { acceptCard, ...defaultMoves },
  auction: { bid, withdraw },
  tradeSetup: { selectPlayer },
  tradeOffer: { makeOffer },
  trade: { acceptOffer, rejectOffer },
  propertyManagment: { buyHouse, sellHouse, mortgage },
});
export type Stages = keyof typeof Moves;

const createStagesMovesMap = <T extends object, V>(
  obj: T,
  valueMapper: (k: T[keyof T]) => V
) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, valueMapper(v)])
  ) as { [K in keyof T]: V };

export const stageMoves = createStagesMovesMap(Moves, k => Object.keys(k));
export default Moves;
