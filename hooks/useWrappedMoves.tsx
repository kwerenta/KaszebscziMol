import { useState } from "react";
import { moveData, movesData, movesMap } from "../lib/moves";

interface WrappedMove extends moveData {
  fn: (...args: any[]) => void;
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
