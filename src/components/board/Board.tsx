import { ReactNode } from "react";
import { Field } from "../../lib/configs/fields";
import { Player } from "../../lib/KaszebscziMol";
import { TilesSlice } from "./TilesSlice";

interface Props {
  players: Player[];
  children: ReactNode;
  fields: Field[];
}

export const Board = ({ children, fields, players }: Props): JSX.Element => (
  <div className="flex flex-col space-y-1">
    <TilesSlice fields={fields} position="top" players={players} />
    <div className="flex">
      <TilesSlice fields={fields} position="left" players={players} />
      {children}
      <TilesSlice fields={fields} position="right" players={players} />
    </div>
    <TilesSlice fields={fields} position="bottom" players={players} />
  </div>
);
