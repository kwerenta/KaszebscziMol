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
      <div className="flex flex-col space-y-1">
        <div className="flex space-x-1">
          {G.fields.slice(0, 13).map((field, i) => (
            <Tile key={i} field={field} index={i} />
          ))}
        </div>
        <div className="flex">
          <div className="flex flex-col-reverse space-y-1 space-y-reverse">
            {G.fields.slice(33).map((field, i) => {
              const index = i + 33;
              return <Tile key={index} field={field} index={index} />;
            })}
          </div>
          <div className="text-center flex p-4 flex-1 mx-4 my-3">
            <section className="flex-1">
              <div className="flex flex-col space-y-4">
                {stageMoves[currentStage].map(move => (
                  <div className="relative" key={move}>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-yellow-300 rounded-lg blur-sm"></div>
                    <button
                      className="relative bg-blue-700 px-3 py-2 text-lg rounded-lg shadow-md w-full"
                      onClick={() => moves[move]()}
                    >
                      {move}
                    </button>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex-1">
              <h2 className="text-3xl">{currentField.name}</h2>
            </section>
          </div>
          <div className="flex flex-col space-y-1">
            {G.fields.slice(13, 20).map((field, i) => {
              const index = i + 13;
              return <Tile key={index} field={field} index={index} />;
            })}
          </div>
        </div>
        <div className="flex flex-row-reverse space-x-1 space-x-reverse">
          {G.fields.slice(20, 33).map((field, i) => {
            const index = i + 20;
            return <Tile key={index} field={field} index={index} />;
          })}
        </div>
      </div>
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

interface TileProps {
  field: Field;
  index: number;
}

const Tile = ({ field, index }: TileProps) => {
  const isBuyable = !!field.price;
  return (
    <div
      className={`h-tile w-tile min-h-[60px] min-w-[60px] text-black bg-white rounded-2xl flex flex-col justify-between ${
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
