import { useState } from "react";
import { Layout } from "../components/Layout";
import { LinkButton } from "../components/LinkButton";
import { Card } from "../components/setup/Card";
import { CardsContainer } from "../components/setup/CardsContainer";
import type { playerData } from "../lib/KaszebscziMol";

const EMPTY_PLAYER: playerData = { name: "", color: "" };
const PLAYER_COLORS = [
  "bg-pattern-red",
  "bg-pattern-blue-dark",
  "bg-pattern-blue",
  "bg-pattern-blue-light",
  "bg-pattern-green",
  "bg-pattern-yellow",
];

export default function Setup() {
  const [colors, setColors] = useState(PLAYER_COLORS.sort());
  const [players, setPlayers] = useState<playerData[]>([]);
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
    setColors(colors.filter(color => playerData.color !== color));
    setPlayerData(EMPTY_PLAYER);
  };

  const removePlayer = (name: string) => {
    setColors(
      [...colors, players.find(player => player.name === name).color].sort()
    );
    setPlayers(prevPlayers =>
      prevPlayers.filter(player => player.name !== name)
    );
  };

  return (
    <Layout>
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Ustawienia rozgrywki</h2>
        <CardsContainer>
          {players.map(player => (
            <Card
              playerData={player}
              key={player.name}
              removePlayer={removePlayer}
            />
          ))}
          {players.length < 6 && (
            <Card
              playerData={playerData}
              colors={colors}
              setPlayerData={setPlayerData}
              addPlayer={addPlayer}
              addPlayerCard
            />
          )}
        </CardsContainer>
        <LinkButton
          text={"Rozpocznij grę"}
          href={{
            pathname: "/game",
            query: { players: JSON.stringify(players) },
          }}
          as={"/game"}
          disabled={players.length < 2}
        />
      </div>
    </Layout>
  );
}
