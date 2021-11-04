import { Field } from "../../lib/configs/fields";

interface TileProps {
  field: Field;
  index: number;
}

export const Tile = ({ field, index }: TileProps) => {
  const isBuyable = !!field.price;
  return (
    <div
      className={`shadow h-tile w-tile min-h-[60px] min-w-[60px] text-black bg-white rounded-2xl flex flex-col justify-between ${
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
