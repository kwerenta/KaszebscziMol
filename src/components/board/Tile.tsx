import { Field } from "../../lib/configs/fields";

interface TileProps {
  field: Field;
  index: number;
}

export const Tile = ({ field, index }: TileProps) => {
  const isBuyable = !!field.price;
  return (
    <div className="shadow h-tile w-tile min-h-[60px] min-w-[60px] text-black bg-white rounded-2xl flex flex-col justify-between relative pb-2">
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
      <span className="z-10 text-center text-3xl text-black/40 flex-1 flex justify-center items-center">
        {index}
      </span>
      {isBuyable && (
        <div
          aria-hidden={true}
          className="absolute inset-0 rounded-2xl overflow-hidden"
        >
          <div
            aria-hidden={true}
            className="absolute bottom-0 bg-red-500 h-1/6 w-full before:absolute before:bottom-[6px] before:w-full before:bg-white before:h-[11px] before:rounded-b-xl"
          ></div>
        </div>
      )}
    </div>
  );
};
