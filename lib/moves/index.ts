import { rollDice, bankrupt, defaultActions } from "./general";
import { buyHouse, sellHouse } from "./isOwner";
import { pay } from "./hasOwner";
import { bid, pass } from "./auction";
import { acceptCard } from "./cardAction";
import { drawCard } from "./cardField";
import { auction, buyProperty } from "./noOwner";

export type Stages = keyof typeof moves;
const moves = {
  rollDice: {
    moves: {
      rollDice,
    },
  },
  noAction: {
    moves: {
      ...defaultActions,
    },
  },
  isOwner: { moves: { ...defaultActions, buyHouse, sellHouse } },
  hasOwner: { moves: { pay, bankrupt } },
  noOwner: { moves: { buyProperty, auction } },
  cardField: { moves: { drawCard } },
  cardAction: { moves: { acceptCard, bankrupt } },
  auction: {
    moves: {
      bid,
      pass,
    },
  },
} as const;

const mapValues = <T extends object, V>(
  obj: T,
  valueMapper: (k: T[keyof T]) => V
) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, valueMapper(v)])
  ) as { [K in keyof T]: V };

export const stageMoves = mapValues(moves, k => Object.keys(k.moves));
export default moves;
