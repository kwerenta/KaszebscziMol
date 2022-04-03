import type { Move } from "boardgame.io";
import type { GameState } from "../KaszebscziMol";
import { bid, withdraw } from "./auction";
import {
  bankrupt,
  endTurn,
  goBack,
  manageProperties,
  rollDice,
  trade,
} from "./base";
import { acceptCard } from "./cardAction";
import { drawCard } from "./cardSpace";
import { pay } from "./hasOwner";
import { payFine, useJailCard } from "./inJail";
import { auction, buyProperty } from "./noOwner";
import { buyHouse, mortgage, sellHouse } from "./propertyManagment";
import {
  acceptOffer,
  makeOffer,
  negotiateOffer,
  rejectOffer,
  selectPlayer,
} from "./trade";

export interface moveData {
  text: string;
  color: "green" | "red" | "orange";
}
const createMovesDataMap = <T extends { [name: string]: moveData }>(map: T) =>
  map;
export const movesData = createMovesDataMap({
  rollDice: {
    text: "Rzuć kośćmi",
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
    color: "green",
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
  negotiateOffer: {
    text: "Negocjuj",
    color: "orange",
  },
  rejectOffer: {
    text: "Odrzuć ofertę",
    color: "red",
  },
  payFine: {
    text: "Zapłać grzywnę",
    color: "orange",
  },
  useJailCard: {
    text: "Użyj karty 'Wyjdź z więzienia'",
    color: "orange",
  },
  goBack: {
    text: "Wróć",
    color: "orange",
  },
});
export type movesMap = keyof typeof movesData;

const defaultMoves = { manageProperties, trade, bankrupt };

const createMovesMap = <
  T extends { [name: string]: Partial<Record<movesMap, Move<GameState>>> }
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
  tradeOffer: { makeOffer, goBack },
  trade: { acceptOffer, negotiateOffer, rejectOffer },
  propertyManagment: { buyHouse, sellHouse, mortgage, goBack },
  inJail: { payFine, useJailCard, rollDice, ...defaultMoves },
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
