import type { Field } from "../../lib/configs/fields";
import { Player } from "../../lib/KaszebscziMol";
import { Tile } from "./Tile";

interface Props {
  players: Player[];
  fields: Field[];
  position: "top" | "left" | "right" | "bottom";
}

export const TilesSlice = ({
  fields,
  position,
  players,
}: Props): JSX.Element => {
  let startIndex = 0;
  let stopIndex: number | undefined = 13;
  let classes = "space-x-1 lg:space-x-2";
  if (position === "left") {
    startIndex = 33;
    stopIndex = undefined;
    classes =
      "flex-col-reverse space-y-1 space-y-reverse lg:space-y-2 lg:space-y-reverse";
  } else if (position === "right") {
    startIndex = 13;
    stopIndex = 20;
    classes = "flex-col space-y-1 lg:space-y-2";
  } else if (position === "bottom") {
    startIndex = 20;
    stopIndex = 33;
    classes =
      "flex-row-reverse space-x-1 lg:space-x-2 space-x-reverse lg:space-x-reverse";
  }
  return (
    <div className={`flex ${classes}`}>
      {fields.slice(startIndex, stopIndex).map((field, i) => {
        const index = i + startIndex;
        return (
          <Tile key={index} field={field} index={index} players={players} />
        );
      })}
    </div>
  );
};
