import { Client } from "boardgame.io/react";
import { KaszebscziMol, playerData } from "../lib/KaszebscziMol";
import { Game } from "../components/Game";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

export default function GameClient(): JSX.Element {
  const router = useRouter();

  const playersQuery = JSON.parse(
    Array.isArray(router.query.players) ? "" : router.query.players
  );
  const players: playerData[] =
    playersQuery && playersQuery.length >= 2
      ? [...playersQuery]
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
    <Layout>
      <Component />
    </Layout>
  );
}
