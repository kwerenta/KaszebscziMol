import { WrappedMove } from "../../hooks/useWrappedMoves";
import type { Player } from "../../lib/KaszebscziMol";
import { MoveButton } from "../Button/MoveButton";
import { Modal } from "./Modal";

interface Props {
  propertyName: string;
  bidMove: WrappedMove<number>;
  withdrawMove: WrappedMove;
  value: number;
  winningPlayerName: string;
  currentPlayer: Player;
}
export const AuctionModal = ({
  propertyName,
  bidMove,
  withdrawMove,
  winningPlayerName,
  value,
  currentPlayer,
}: Props) => {
  return (
    <Modal show>
      <div className="dark:bg-blue-gray-dark flex flex-col gap-4 rounded-lg bg-gray-100 p-4">
        <div>
          <h1 className="text-3xl">Aukcja</h1>
          <h2 className="text-xl">{propertyName}</h2>
          <h2 className="text-xl ">
            Aktualny zwycięzca:&nbsp;
            <span className="font-bold">
              {winningPlayerName} | {value}$
            </span>
          </h2>
        </div>
        <hr />
        <h2 className="text-xl">
          Aktualny licytator:&nbsp;
          <span className="font-bold">
            {currentPlayer.name} | {currentPlayer.money}$
          </span>
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {[1, 10, 100].map(amount => (
            <MoveButton
              text={`${bidMove.text} ${amount}$`}
              color={bidMove.color}
              fn={() => bidMove.fn(amount)}
              disabled={currentPlayer.money < value + amount}
            />
          ))}
          <MoveButton
            text={withdrawMove.text}
            color={withdrawMove.color}
            fn={withdrawMove.fn}
          />
        </div>
      </div>
    </Modal>
  );
};
