import { Space, groups } from "../../lib/configs/spaces";
import { Player } from "../../lib/KaszebscziMol";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TileProps {
  players: Record<string, Player>;
  space: Space;
  index: number;
}

export const Tile = ({ space, players }: TileProps) => {
  const isProperty = !!space.price;
  const isBought = !!space.owner;
  return (
    <div
      className={`h-tile w-tile bg-gray-dark dark:bg-gray-light relative flex min-h-[60px] min-w-[60px] flex-col justify-between rounded-lg pb-2 text-black md:rounded-xl lg:rounded-2xl ${
        isProperty ? `shadow-group-indicator ${groups[space.group].color}` : ""
      }`}
    >
      <div className={"flex justify-between"}>
        <span className="flex-1 text-center text-sm">
          {isProperty && `$${space.price}`}
        </span>
        <div
          className={`h-4 w-4 rounded-tr-lg md:rounded-tr-xl lg:h-5 lg:w-5 lg:rounded-tr-2xl ${
            isProperty
              ? isBought
                ? players[space.owner].color
                : "bg-blue-gray-light dark:bg-gray-dark"
              : ""
          } `}
        />
      </div>
      <span className="z-10 flex flex-1 items-center justify-center text-center text-3xl text-gray-800">
        <FontAwesomeIcon icon={space.icon} />
      </span>
    </div>
  );
};
