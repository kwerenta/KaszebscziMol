import type { Player } from "../../lib/KaszebscziMol";
import { MoveButton } from "../Button/MoveButton";
import { Modal } from "./Modal";

interface Props {
  propertyName: string;
  handleBid: (amount: number) => void;
  handleWithdraw: () => void;
  value: number;
  winningPlayerName: string;
  currentPlayer: Player;
}
export const AuctionModal = ({
  propertyName,
  handleBid,
  handleWithdraw,
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
          {[1, 10, 50, 100].map(amount => (
            <MoveButton
              text={`Zalicytuj ${amount}$`}
              color="green"
              moveFn={() => handleBid(amount)}
              disabled={currentPlayer.money < value + amount}
            />
          ))}
          <MoveButton
            text={`Wycofaj się`}
            color="red"
            moveFn={handleWithdraw}
          />
        </div>
      </div>
    </Modal>
  );
};
