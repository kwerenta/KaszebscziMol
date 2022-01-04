import type { BoardProps } from "boardgame.io/react";
import type { GameState } from "../lib/KaszebscziMol";
import { stageMoves, Stages } from "../lib/moves";
import { Board } from "./board/Board";
import { Button } from "./Button";

export const Game = ({ G, ctx, moves }: BoardProps<GameState>): JSX.Element => {
  const currentPlayer = G.players[parseInt(ctx.currentPlayer)];
  const currentField = G.fields[currentPlayer.position];
  const currentStage = (ctx.activePlayers?.[ctx.currentPlayer] ||
    ctx.phase ||
    "rollDice") as Stages;

  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <Board fields={G.fields} players={G.players}>
        <div className="text-center flex p-4 flex-1 mx-4 my-3">
          <section className="flex-1">
            <div className="flex flex-col gap-8">
              {stageMoves[currentStage].map((move, i) => (
                <Button
                  color="orange"
                  type="move"
                  key={i}
                  onClick={moves[move]}
                  text={move}
                />
              ))}
            </div>
          </section>
          <section className="flex-1">
            <h2 className="text-3xl">
              {ctx.gameover ? "Koniec" : currentField.name}
            </h2>
          </section>
        </div>
      </Board>
      <div className="absolute right-0 h-full flex flex-col justify-center items-center gap-2 z-20">
        {ctx.playOrder.map(playerIndex => {
          const player = G.players[parseInt(playerIndex)];
          return (
            <div
              key={playerIndex}
              className={`w-full bg-gray-dark dark:bg-gray-light text-gray-800 px-3 py-2 rounded-l-lg ${
                player.name === currentPlayer.name ? "font-extrabold" : ""
              }`}
            >
              <h2 className="text-xl">{player.name}</h2>
              <p>${player.money}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};
