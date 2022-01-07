import { Field, groups } from "../../lib/configs/fields";
import { Player } from "../../lib/KaszebscziMol";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TileProps {
  players: Player[];
  field: Field;
  index: number;
}

export const Tile = ({ field, index, players }: TileProps) => {
  const isBuyable = !!field.price;
  const isBought = !!field.owner;
  return (
    <div
      className={`h-tile w-tile min-h-[60px] min-w-[60px] text-black bg-gray-dark dark:bg-gray-light rounded-lg md:rounded-xl lg:rounded-2xl flex flex-col justify-between relative pb-2 ${
        isBuyable ? `shadow-group-indicator ${groups[field.group].color}` : ""
      }`}
    >
      <div className={"flex justify-between"}>
        <span className="text-center text-sm flex-1">
          {isBuyable && `$${field.price}`}
        </span>
        <div
          className={`w-4 h-4 lg:w-5 lg:h-5 rounded-tr-lg md:rounded-tr-xl lg:rounded-tr-2xl ${
            isBuyable
              ? isBought
                ? players[parseInt(field.owner!)].color
                : "bg-blue-gray-light dark:bg-gray-dark"
              : ""
          } `}
        />
      </div>
      <span className="z-10 text-center text-3xl text-gray-800 flex-1 flex justify-center items-center">
        <FontAwesomeIcon icon={field.icon} />
      </span>
    </div>
  );
};
