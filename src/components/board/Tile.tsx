import { Field, groups } from "../../lib/configs/fields";
import { Player } from "../../lib/KaszebscziMol";

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
      className={`h-tile w-tile min-h-[60px] min-w-[60px] text-black bg-white rounded-2xl flex flex-col justify-between relative pb-2 ${
        isBuyable ? `shadow-group-indicator ${groups[field.group].color}` : ""
      }`}
    >
      <div className={"flex justify-between"}>
        <span className="text-center text-sm flex-1">
          {isBuyable && `$ ${field.price}`}
        </span>
        <div
          className={`w-5 h-5 rounded-tr-2xl ${
            isBuyable
              ? isBought
                ? players[parseInt(field.owner!)].color
                : "bg-gray-400"
              : ""
          } `}
        />
      </div>
      <span className="z-10 text-center text-3xl text-black/40 flex-1 flex justify-center items-center">
        {index}
      </span>
    </div>
  );
};
