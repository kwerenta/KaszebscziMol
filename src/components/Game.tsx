import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { ReactElement } from "react";
import { GameState } from "../lib/KaszebscziMol";
import { Board } from "./board/Board";
import { Button } from "./Button";

interface Props extends BoardProps {
  G: GameState;
}

type Stages =
  | "rollDice"
  | "noAction"
  | "isOwner"
  | "hasOwner"
  | "noOwner"
  | "cardField"
  | "auction";

export const Game = ({ G, ctx, moves }: Props): ReactElement => {
  const currentPlayer = G.players[parseInt(ctx.currentPlayer)];
  const currentField = G.fields[currentPlayer.position];
  const currentStage = (ctx.activePlayers?.[ctx.currentPlayer] ||
    ctx.phase ||
    "rollDice") as Stages;
  const stageMoves = {
    rollDice: ["rollDice"],
    noAction: ["endTurn", "bankrupt"],
    isOwner: ["endTurn", "bankrupt", "buyHouse", "sellHouse"],
    hasOwner: ["pay"],
    noOwner: ["buyProperty", "auction"],
    cardField: ["drawCard", "acceptCard"],
    auction: ["bid", "pass"],
  };
  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <Board fields={G.fields}>
        <div className="text-center flex p-4 flex-1 mx-4 my-3">
          <section className="flex-1">
            <div className="flex flex-col space-y-4">
              {stageMoves[currentStage].map(move => (
                <Button fn={moves[move]} name={move} />
              ))}
            </div>
          </section>
          <section className="flex-1">
            <h2 className="text-3xl">{currentField.name}</h2>
          </section>
        </div>
      </Board>
      <div className="absolute right-0 h-full flex flex-col justify-center items-center gap-2">
        {ctx.playOrder.map(playerIndex => {
          const player = G.players[parseInt(playerIndex)];
          return (
            <div
              key={playerIndex}
              className={`w-full bg-white text-black px-3 py-2 rounded-l-lg ${
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
