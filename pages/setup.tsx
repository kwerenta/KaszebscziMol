import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { Card } from "../components/setup/Card";
import { CardsContainer } from "../components/setup/CardsContainer";
import type { playerData } from "../lib/KaszebscziMol";

export default function Setup() {
  const [players, setPlayers] = useState<playerData[]>([]);
  const EMPTY_PLAYER: playerData = { name: "", color: "" };
  const [playerData, setPlayerData] = useState<playerData>(EMPTY_PLAYER);

  const addPlayer = () => {
    if (
      playerData.name === "" ||
      playerData.color === "" ||
      players.some(player => player.name === playerData.name)
    )
      return;
    setPlayers([
      ...players,
      { name: playerData.name, color: playerData.color },
    ]);
    setPlayerData(EMPTY_PLAYER);
  };
  const removePlayer = (name: string) => {
    setPlayers(prevPlayers =>
      prevPlayers.filter(player => player.name !== name)
    );
  };

  return (
    <Layout>
      <div className="text-center w-full h-full flex items-center justify-center flex-col">
        <h2 className="text-3xl font-bold mb-8">Ustawienia rozgrywki</h2>
        <CardsContainer>
          {players.map(player => (
            <Card
              playerData={player}
              key={player.name}
              removePlayer={removePlayer}
            />
          ))}
          <Card
            playerData={playerData}
            setPlayerData={setPlayerData}
            addPlayer={addPlayer}
            addPlayerCard
          />
        </CardsContainer>
        <Link
          href={{
            pathname: "/game",
            query: { players: JSON.stringify(players) },
          }}
          as={"/game"}
          passHref
        >
          <a>
            <Button color="green" text="Rozpocznij grę" type="CTA" />
          </a>
        </Link>
      </div>
    </Layout>
  );
}
