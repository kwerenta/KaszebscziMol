import { WrappedMove } from "../../hooks/useWrappedMoves";
import { GameState } from "../../lib/KaszebscziMol";
import { Modal } from "./Modal";

interface Props {
  currentPlayer: string;
  selectPlayerMove: WrappedMove<string>;
  players: GameState["players"];
}

export const SelectPlayerModal = ({
  players,
  currentPlayer,
  selectPlayerMove,
}: Props) => {
  return (
    <Modal show>
      <ul className="dark:bg-blue-gray-dark container flex justify-center gap-4 rounded-lg bg-gray-100 p-4">
        {Object.entries(players).map(
          ([id, player]) =>
            id !== currentPlayer && (
              <li
                className="cursor-pointer rounded-md p-2 text-lg hover:bg-black/30 dark:hover:bg-white/30"
                onClick={() => selectPlayerMove.fn(id)}
              >
                {player.name}
              </li>
            )
        )}
      </ul>
    </Modal>
  );
};
