import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import type { playerData } from "../../lib/KaszebscziMol";

interface PlayerCardProps {
  removePlayer: (name: string) => void;
  addPlayerCard?: never;
  setPlayerData?: never;
  addPlayer?: never;
}

interface AddPlayerCardProps {
  removePlayer?: never;
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
}: CardProps) => {
  return (
    <div className="rounded-2xl shadow-md flex flex-col text-white dark:text-black bg-blue-gray-dark dark:bg-blue-gray-light items-center gap-4 p-4 w-64">
      <div
        className={`cursor-pointer rounded-full w-10 h-10 flex items-center justify-center transition-colors group ${
          addPlayerCard
            ? "mr-auto hover:bg-green-dark/40"
            : "ml-auto hover:bg-red-light/40"
        }`}
        onClick={
          addPlayerCard ? addPlayer : () => removePlayer(playerData.name)
        }
      >
        <FontAwesomeIcon
          icon={addPlayerCard ? faSave : faTrash}
          className={`opacity-70 group-hover:opacity-100 transition-opacity ${
            addPlayerCard ? "text-green-light" : "text-red-light"
          }`}
        />
      </div>

      <Image
        src={`https://avatars.dicebear.com/4.9/api/avataaars/${playerData.name}.svg`}
        alt="Awatar gracza"
        width={128}
        height={128}
      />
      {addPlayerCard ? (
        <>
          <div>
            <label>Kolor</label>
            <div className="flex overflow-hidden w-full gap-3">
              {[
                "bg-fuchsia-500",
                "bg-green-800",
                "bg-pink-700",
                "bg-sky-500",
              ].map(color => (
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
              className="rounded-md p-2 text-black bg-gray-light"
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
