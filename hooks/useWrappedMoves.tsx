import { useState } from "react";
import { moveData, movesData, movesMap } from "../lib/moves";

export type MoveFn<T = never> = { (): void } | { (payload: T): void };

export interface WrappedMove<T = never> extends moveData {
  fn: MoveFn<T>;
}

export const useWrappedMoves = (
  moveFns: Record<movesMap, (...args: any[]) => void>
) => {
  const wrapMoves = () =>
    Object.fromEntries(
      Object.entries(movesData).map(([name, data]) => [
        name,
        { ...data, fn: moveFns[name] },
      ])
    );
  const [wrappedMoves] = useState(wrapMoves);
  return wrappedMoves as Record<movesMap, WrappedMove>;
};
