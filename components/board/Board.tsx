import { ReactNode } from "react";
import { Space } from "../../lib/configs/spaces";
import { Player } from "../../lib/KaszebscziMol";
import { TilesSlice } from "./TilesSlice";

interface Props {
  players: Record<string, Player>;
  children: ReactNode;
  spaces: Space[];
}

export const Board = ({ children, spaces, players }: Props): JSX.Element => (
  <div className="flex w-min flex-col space-y-1 lg:space-y-2">
    <TilesSlice spaces={spaces} position="top" players={players} />
    <div className="flex">
      <TilesSlice spaces={spaces} position="left" players={players} />
      {children}
      <TilesSlice spaces={spaces} position="right" players={players} />
    </div>
    <TilesSlice spaces={spaces} position="bottom" players={players} />
  </div>
);
