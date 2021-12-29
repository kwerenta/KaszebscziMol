import { Client } from "boardgame.io/react";
import { useLocation } from "react-router-dom";
import { KaszebscziMol, playerData } from "../lib/KaszebscziMol";
import { Game } from "./Game";

export const GameClient = (): JSX.Element => {
  const location = useLocation();
  const { state } = location;
  const players: playerData[] =
    state.players.length >= 2
      ? state.players
      : [
          { name: "Kamil", color: "bg-fuchsia-500" },
          { name: "Rafał", color: "bg-green-800" },
          { name: "Dawid", color: "bg-pink-700" },
          { name: "Piotr", color: "bg-sky-500" },
        ];

  const Component = Client({
    game: KaszebscziMol([...players]),
    numPlayers: players.length,
    board: Game,
    debug: true,
  });

  return (
    <>
      <Component />
    </>
  );
};
