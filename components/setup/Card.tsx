import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dispatch, SetStateAction, useMemo } from "react";
import type { playerData } from "../../lib/KaszebscziMol";

interface PlayerCardProps {
  removePlayer: (name: string) => void;
  colors?: never;
  addPlayerCard?: never;
  setPlayerData?: never;
  addPlayer?: never;
}

interface AddPlayerCardProps {
  removePlayer?: never;
  colors: string[];
  addPlayerCard: true;
  setPlayerData: Dispatch<SetStateAction<playerData>>;
  addPlayer: () => void;
}

type CardProps = (PlayerCardProps | AddPlayerCardProps) & {
  playerData: playerData;
};

export const Card = ({
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
    <div className="snap-center group rounded-2xl shadow-md flex flex-col text-white dark:text-black bg-blue-gray-dark dark:bg-blue-gray-light items-center gap-4 p-4 w-64 shrink-0">
      <div
        className={`cursor-pointer rounded-full w-10 h-10 flex items-center justify-center transition-all group ${
          addPlayerCard
            ? "mr-auto hover:bg-green-dark/40"
            : "ml-auto hover:bg-red-light/40 opacity-0 group-hover:opacity-100"
        }`}
        onClick={
          addPlayerCard ? addPlayer : () => removePlayer(playerData.name)
        }
      >
        <FontAwesomeIcon
          icon={addPlayerCard ? faPlusCircle : faTrash}
          className={`opacity-70 group-hover:opacity-100 transition-opacity ${
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
            <div className="flex overflow-hidden w-full gap-2">
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
                  className={`cursor-pointer w-8 h-8 ${color} opacity-70 hover:opacity-100 checked:opacity-100 appearance-none rounded-md checked:border-2 checked:border-gray-light`}
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
              className="rounded-md p-2 text-black bg-gray-light w-full"
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
    </div>
  );
};
