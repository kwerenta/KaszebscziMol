import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dispatch, SetStateAction, useMemo } from "react";
import type { PlayerData } from "../../lib/KaszebscziMol";
import { Card } from "./Card";

interface PlayerCardProps {
  removePlayer: (name: string) => void;
  colors?: never;
  addPlayerCard?: false;
  setPlayerData?: never;
  addPlayer?: never;
}

interface AddPlayerCardProps {
  removePlayer?: never;
  colors: string[];
  addPlayerCard: true;
  setPlayerData: Dispatch<SetStateAction<PlayerData>>;
  addPlayer: () => void;
}

type CardProps = (PlayerCardProps | AddPlayerCardProps) & {
  playerData: PlayerData;
};

export const PlayerCard = ({
  playerData,
  setPlayerData,
  addPlayer,
  addPlayerCard,
  removePlayer,
  colors,
}: CardProps) => {
  const avatar = useMemo(
    () =>
      createAvatar(style, {
        seed: playerData.name,
        dataUri: true,
      }),
    [playerData.name]
  );

  return (
    <Card>
      <div
        className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all ${
          addPlayerCard
            ? "hover:bg-green-dark/40 mr-auto"
            : "hover:bg-red-light/40 ml-auto opacity-0 group-hover:opacity-100"
        }`}
        onClick={
          addPlayerCard ? addPlayer : () => removePlayer(playerData.name)
        }
      >
        <FontAwesomeIcon
          icon={addPlayerCard ? faPlusCircle : faTrash}
          className={`opacity-70 transition-opacity group-hover:opacity-100 ${
            addPlayerCard ? "text-green-light" : "text-red-light"
          }`}
        />
      </div>
      <Image
        className={`rounded-2xl ${playerData.color}`}
        src={avatar}
        alt="Awatar gracza"
        width={128}
        height={128}
      />
      {addPlayerCard ? (
        <>
          <div>
            <label>Kolor</label>
            <div className="flex w-full gap-2 overflow-hidden">
              {colors.map(color => (
                <input
                  type="radio"
                  name="color"
                  key={color}
                  value={color}
                  checked={playerData.color === color}
                  onChange={e =>
                    setPlayerData({
                      ...playerData,
                      color: e.currentTarget.value,
                    })
                  }
                  className={`h-8 w-8 cursor-pointer ${color} checked:border-gray-light appearance-none rounded-md opacity-70 checked:border-2 checked:opacity-100 hover:opacity-100`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Nazwa</label>
            <input
              type="text"
              minLength={2}
              maxLength={16}
              className="bg-gray-light w-full rounded-md p-2 text-black"
              id="name"
              value={playerData.name}
              onChange={e =>
                setPlayerData({ ...playerData, name: e.currentTarget.value })
              }
            />
          </div>
        </>
      ) : (
        <h1 className="text-2xl font-bold">{playerData.name}</h1>
      )}
    </Card>
  );
};
