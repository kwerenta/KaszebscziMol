import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { ReactElement } from "react";
import { Field } from "../lib/configs/fields";
import { GameState } from "../lib/KaszebscziMol";

interface Props extends BoardProps {
  G: GameState;
}

export const Game = ({ G, ctx }: Props): ReactElement => {
  const currentPlayer = G.players[parseInt(ctx.currentPlayer)];
  const currentStage =
    ctx.activePlayers?.[ctx.currentPlayer] || ctx.phase || "rollDice";
  return (
    <main className="flex justify-center items-center p-4">
      <div className="grid board-shape gap-1">
        {G.fields.map((field, i) => (
          <Tile key={i} field={field} />
        ))}
        <div className="board-center text-center">
          <h1 className="text-4xl">{currentPlayer.name}</h1>
          <p>{currentStage}</p>
        </div>
      </div>
    </main>
  );
};

interface TileProps {
  field: Field;
}

const Tile = ({ field }: TileProps) => (
  <div className="text-black bg-white rounded-lg flex flex-row">
    <div>$ {field.price}</div>
  </div>
);
