import type { BoardProps } from "boardgame.io/react";
import { cards } from "../lib/configs/cards";
import type { GameState } from "../lib/KaszebscziMol";
import { movesMap, stageMoves, Stages } from "../lib/moves";
import { Board } from "./board/Board";
import { MoveButton } from "./Button/MoveButton";
import { AuctionModal } from "./modal/AuctionModal";
import { SelectPlayerModal } from "./modal/SelectPlayerModal";
import { MakeOfferModal } from "./modal/MakeOfferModal";
import { useWrappedMoves } from "../hooks/useWrappedMoves";

export const Game = ({
  G,
  ctx,
  moves: moveFns,
}: BoardProps<GameState>): JSX.Element => {
  const moves = useWrappedMoves(moveFns);
  const currentPlayer = G.players[ctx.currentPlayer];
  const currentSpace = G.spaces[currentPlayer.position];
  const currentStage = (ctx.activePlayers?.[ctx.currentPlayer] ||
    ctx.phase ||
    "rollDice") as Stages;

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Board spaces={G.spaces} players={G.players}>
        <div className="flex flex-1 gap-8 px-8 py-6 text-center">
          <section className="flex-1">
            <div className="flex flex-col gap-8">
              {stageMoves[currentStage].map((move: movesMap, i) => (
                <MoveButton
                  color={moves[move].color}
                  key={i}
                  moveFn={moves[move].fn}
                  text={moves[move].text}
                />
              ))}
            </div>
          </section>
          <section className="flex-1">
            <h2 className="text-3xl">
              {ctx.gameover ? (
                "Koniec"
              ) : (
                <span>
                  {currentSpace.name}
                  {/* TEMP */}
                  <div>
                    Kostki: {G.dice[0]} i {G.dice[1]}
                  </div>
                </span>
              )}
            </h2>
            {currentStage === "cardAction" && (
              <p>{cards[G.card.current].text}</p>
            )}
            {currentStage === "auction" && (
              <AuctionModal
                propertyName={G.auction.properties
                  .map(propertyIndex => G.spaces[propertyIndex].name)
                  .join(", ")}
                handleBid={moves["bid"].fn}
                handleWithdraw={moves["withdraw"].fn}
                value={G.auction.price}
                winningPlayerName={G.players[G.auction.player].name}
                currentPlayer={currentPlayer}
              />
            )}
            {currentStage === "tradeSetup" && (
              <SelectPlayerModal
                currentPlayer={ctx.currentPlayer}
                players={G.players}
                handleSelection={moves["selectPlayer"].fn}
              />
            )}
            {currentStage === "tradeOffer" && (
              <MakeOfferModal
                handleOffer={moves["makeOffer"].fn}
                handleGoBack={moves["goBack"].fn}
                players={G.players}
                spaces={G.spaces}
                trade={G.trade}
              />
            )}
          </section>
        </div>
      </Board>
      <div className="absolute right-0 z-20 flex h-full flex-col items-center justify-center gap-2">
        {ctx.playOrder.map(playerIndex => {
          const player = G.players[playerIndex];
          return (
            <div
              key={playerIndex}
              className={`bg-gray-dark dark:bg-gray-light w-full rounded-l-lg px-3 py-2 text-gray-800 ${
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
