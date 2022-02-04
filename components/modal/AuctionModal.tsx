import type { Player } from "../../lib/KaszebscziMol";
import { Button } from "../Button";
import { Modal } from "./Modal";

interface Props {
  propertyName: string;
  handleBid: (amount: number) => void;
  handlePass: () => void;
  value: number;
  winningPlayerName: string;
  currentPlayer: Player;
}
export const AuctionModal = ({
  propertyName,
  handleBid,
  handlePass,
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
            <Button
              type="move"
              text={`Zalicytuj ${amount}$`}
              color="green"
              onClick={() => handleBid(amount)}
              disabled={currentPlayer.money < value + amount}
            />
          ))}
          <Button
            type="move"
            text={`Spasuj`}
            color="red"
            onClick={handlePass}
          />
        </div>
      </div>
    </Modal>
  );
};
