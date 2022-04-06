import { KaszebscziMol, SetupData } from "../lib/KaszebscziMol";
import { Game } from "../components/Game";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { ClientProps, GameClient } from "../components/GameClient";

export default function Play(): JSX.Element {
  const router = useRouter();

  const playersData =
    router.query.players &&
    !Array.isArray(router.query.players) &&
    JSON.parse(router.query.players);

  const players: SetupData =
    playersData && playersData.length >= 2
      ? playersData
      : [
          { name: "Kamil", color: "bg-fuchsia-500" },
          { name: "Rafał", color: "bg-green-800" },
          { name: "Dawid", color: "bg-pink-700" },
          { name: "Piotr", color: "bg-sky-500" },
        ];

  const clientOptions: ClientProps = {
    game: KaszebscziMol,
    numPlayers: players.length,
    board: Game,
    setupData: [...players],
    debug: true,
  };

  return (
    <Layout>
      <GameClient {...clientOptions} />
    </Layout>
  );
}
