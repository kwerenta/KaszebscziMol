import { ReactNode } from "react";
import { Field } from "../../lib/configs/fields";
import { TilesSlice } from "./TilesSlice";

interface Props {
  children: ReactNode;
  fields: Field[];
}

export const Board = ({ children, fields }: Props): JSX.Element => (
  <div className="flex flex-col space-y-1">
    <TilesSlice fields={fields} position="top" />
    <div className="flex">
      <TilesSlice fields={fields} position="left" />
      {children}
      <TilesSlice fields={fields} position="right" />
    </div>
    <TilesSlice fields={fields} position="bottom" />
  </div>
);
