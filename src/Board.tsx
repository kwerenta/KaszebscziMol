import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { ReactElement } from "react";
import { GameState } from "./lib/KaszebscziMol";

interface Props extends BoardProps {
  G: GameState;
}

export const Board = ({ G, ctx }: Props): ReactElement => {
  const currentPlayer = G.players[parseInt(ctx.currentPlayer)];
  const currentStage =
    ctx.activePlayers?.[ctx.currentPlayer] || ctx.phase || "rollDice";
  return (
    <div>
      <h1>{currentPlayer?.name || "brak gracza"}</h1>
      <h4>
        {G.auction.price}$ | {G.auction.player} | {G.auction.property}
      </h4>
      <p>{currentStage}</p>
      <ul>
        {G.players.map(p => (
          <li key={p.id}>
            {p.name} {p.position}
          </li>
        ))}
      </ul>
    </div>
  );
};
