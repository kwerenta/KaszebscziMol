import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { LinkButton } from "../components/Button/LinkButton";
import { Card } from "../components/setup/Card";
import { CardsContainer } from "../components/setup/CardsContainer";
import { PlayerCard } from "../components/setup/PlayerCard";
import type { playerData } from "../lib/KaszebscziMol";
import { faCouch, faGlobe, faRobot } from "@fortawesome/free-solid-svg-icons";

const EMPTY_PLAYER: playerData = { name: "", color: "" };
const PLAYER_COLORS = [
  "bg-pattern-red",
  "bg-pattern-blue-dark",
  "bg-pattern-blue",
  "bg-pattern-blue-light",
  "bg-pattern-green",
  "bg-pattern-yellow",
];
const STEPS = ["Tryb", "Gracze"] as const;

export default function Setup() {
  const [activeStep, setActiveStep] = useState(0);
  const [colors, setColors] = useState(PLAYER_COLORS.sort());
  const [players, setPlayers] = useState<playerData[]>([]);
  const [playerData, setPlayerData] = useState<playerData>(EMPTY_PLAYER);

  const nextStep = () => {
    setActiveStep(currentStep =>
      currentStep < STEPS.length ? currentStep + 1 : currentStep
    );
  };

  const prevStep = () =>
    setActiveStep(currentStep =>
      currentStep > 0 ? currentStep - 1 : currentStep
    );

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
    <Layout className="text-center">
      <h2 className="mb-2 text-3xl font-bold">Ustawienia rozgrywki</h2>
      <div className="mb-4 flex gap-12">
        {STEPS.map((step, index) => (
          <div className="flex items-center gap-2" key={step}>
            <div
              className={`${
                activeStep > index
                  ? "bg-blue-dark dark:bg-blue-light cursor-pointer"
                  : "bg-blue-gray-dark dark:bg-blue-gray-light"
              } ${
                activeStep === index && "ring-2 ring-white"
              } flex h-12 w-12 items-center justify-center rounded-full text-xl`}
              onClick={() => activeStep > index && setActiveStep(index)}
            >
              {index + 1}
            </div>
            <span className="text-lg">{step}</span>
          </div>
        ))}
      </div>
      {activeStep === 0 ? (
        <CardsContainer>
          <Card className="group cursor-pointer" onClick={nextStep}>
            <FontAwesomeIcon
              icon={faCouch}
              className="text-pattern-red mb-4 text-8xl opacity-60 transition-opacity group-hover:opacity-80"
            />
            Lokalny tryb wielosobowy
          </Card>
          <Card>
            <FontAwesomeIcon
              icon={faGlobe}
              className="text-gray-dark dark:text-gray-light mb-4 text-8xl opacity-60"
            />
            Sieciowy tryb wielosobowy
          </Card>
          <Card>
            <FontAwesomeIcon
              icon={faRobot}
              className="text-gray-dark dark:text-gray-light mb-4 text-8xl opacity-60"
            />
            Tryb jednoosobowy z komputerem
          </Card>
        </CardsContainer>
      ) : (
        <>
          <CardsContainer>
            {players.map(player => (
              <PlayerCard
                playerData={player}
                key={player.name}
                removePlayer={removePlayer}
              />
            ))}
            {players.length < 6 && (
              <PlayerCard
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
        </>
      )}
    </Layout>
  );
}
