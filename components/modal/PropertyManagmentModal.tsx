import { WrappedMove } from "../../hooks/useWrappedMoves";
import { Space } from "../../lib/configs/spaces";
import { Player } from "../../lib/KaszebscziMol";
import { Tile } from "../board/Tile";
import { MoveButton } from "../Button/MoveButton";
import { Modal } from "./Modal";

interface Props {
  goBackMove: WrappedMove;
  mortgageMove: WrappedMove<number>;
  buyHouseMove: WrappedMove<number>;
  sellHouseMove: WrappedMove<number>;
  currentPlayerID: string;
  currentPlayer: Player;
  spaces: Space[];
}

export const PropertyManagmentModal = ({
  goBackMove,
  mortgageMove,
  buyHouseMove,
  sellHouseMove,
  currentPlayerID,
  currentPlayer,
  spaces,
}: Props) => (
  <Modal show>
    <div className="dark:bg-blue-gray-dark container rounded-lg bg-gray-100 p-4">
      <h2 className="text-xl">Twoje nieruchomości</h2>
      <div className="flex flex-wrap gap-4">
        {currentPlayer.properties.map(propertyIndex => (
          <div className="group relative">
            <Tile
              players={{ [currentPlayerID]: currentPlayer }}
              space={spaces[propertyIndex]}
            />
            <div className="absolute top-full left-1/2 z-20 hidden -translate-x-1/2 group-hover:block">
              <MoveButton
                {...mortgageMove}
                fn={() => mortgageMove.fn(propertyIndex)}
              />
              <MoveButton
                {...buyHouseMove}
                fn={() => buyHouseMove.fn(propertyIndex)}
              />
              <MoveButton
                {...sellHouseMove}
                fn={() => sellHouseMove.fn(propertyIndex)}
              />
            </div>
          </div>
        ))}
      </div>
      <MoveButton {...goBackMove} />
    </div>
  </Modal>
);
