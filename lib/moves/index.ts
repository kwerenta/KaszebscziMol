import { rollDice, bankrupt, endTurn } from "./base";
import { buyHouse, sellHouse } from "./isOwner";
import { pay } from "./hasOwner";
import { bid, pass } from "./auction";
import { acceptCard } from "./cardAction";
import { drawCard } from "./cardSpace";
import { auction, buyProperty } from "./noOwner";
import type { GameState } from "../KaszebscziMol";
import type { Ctx, Move } from "boardgame.io";

interface moveData {
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
  buyHouse: {
    text: "Kup dom",
    color: "green",
  },
  sellHouse: {
    text: "Sprzedaj dom",
    color: "red",
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
  pass: {
    text: "Spasuj",
    color: "red",
  },
});
export type movesMap = keyof typeof movesData;

const createMovesMap = <
  T extends { [name: string]: Partial<Record<movesMap, Move<GameState, Ctx>>> }
>(
  map: T
) => map;
const Moves = createMovesMap({
  rollDice: { rollDice },
  noAction: { endTurn, bankrupt },
  isOwner: { endTurn, bankrupt, buyHouse, sellHouse },
  hasOwner: { pay, bankrupt },
  noOwner: { buyProperty, auction },
  cardSpace: { drawCard },
  cardAction: { acceptCard, bankrupt },
  auction: { bid, pass },
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
