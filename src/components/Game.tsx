import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { ReactElement } from "react";
import { Field } from "../lib/configs/fields";
import { GameState } from "../lib/KaszebscziMol";

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
    <main className="flex justify-center items-center h-screen">
      <div className="grid board-shape gap-1">
        {G.fields.map((field, i) => (
          <Tile key={i} field={field} index={i} />
        ))}
        <div className="board-center text-center flex">
          <section className="flex-1">
            <h1 className="text-4xl">{currentPlayer.name}</h1>
            <p>{currentStage}</p>
            <div className="flex flex-col gap-2">
              {stageMoves[currentStage].map(move => (
                <button
                  key={move}
                  className="bg-gradient-to-br from-red-600 via-red-400 to-red-700 px-3 py-2 text-lg rounded-lg shadow-md"
                  onClick={() => moves[move]()}
                >
                  {move}
                </button>
              ))}
            </div>
          </section>
          <section className="flex-1">
            <h2 className="text-3xl">
              {G.fields[currentPlayer.position].name}
            </h2>
          </section>
        </div>
      </div>
      <div className="absolute right-0 h-full flex flex-col justify-center items-center gap-2">
        {ctx.playOrder.map(playerIndex => {
          const player = G.players[parseInt(playerIndex)];
          return (
            <div
              className={`bg-white text-black px-3 py-2 rounded-l-lg ${
                player.name === currentPlayer.name ? "font-extrabold" : ""
              }`}
            >
              {player.name}
            </div>
          );
        })}
      </div>
    </main>
  );
};

interface TileProps {
  field: Field;
  index: number;
}

const Tile = ({ field, index }: TileProps) => {
  const isBuyable = !!field.price;
  return (
    <div
      className={`square h-full text-black bg-white rounded-2xl flex flex-col justify-between ${
        isBuyable
          ? "after:content-end after:bg-black after:w-full after:h-4 after:rounded-b-2xl relative before:absolute before:bg-white before:w-full before:h-[11px] before:rounded-b-xl before:bottom-[6px]"
          : "pb-4"
      }`}
    >
      <div
        className={`flex justify-between ${
          isBuyable
            ? "after:content-end after:bg-gray-400 after:w-5 after:h-5 after:rounded-tr-2xl"
            : "mt-5"
        }`}
      >
        <span className="text-center text-sm flex-1">
          {isBuyable && `$ ${field.price}`}
        </span>
      </div>
      <span className="text-center text-3xl text-black/40 flex-1 flex justify-center items-center">
        {index}
      </span>
    </div>
  );
};
