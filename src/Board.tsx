import { BoardProps } from "boardgame.io/dist/types/packages/react";
import React, { ReactElement } from "react";
import { GameState } from "./lib/KaszebscziMol";

interface Props extends BoardProps {
  G: GameState;
}

export const Board = ({ G, ctx }: Props): ReactElement => {
  const currentPlayer = G.players[parseInt(ctx.currentPlayer)];
  const currentStage = ctx.activePlayers?.[ctx.currentPlayer] || "rollDice";
  return (
    <div>
      <h1>{currentPlayer?.name || "brak gracza"}</h1>
      <p>{currentStage}</p>
      <ul>
        {G.players.map(p => (
          <li>
            {p.name} {JSON.stringify(p.properties)}
          </li>
        ))}
      </ul>
    </div>
  );
};
