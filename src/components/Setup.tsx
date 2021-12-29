import { useState } from "react";
import { Link } from "react-router-dom";
import type { playerData } from "../lib/KaszebscziMol";

export const Setup = () => {
  const [players, setPlayers] = useState<playerData[]>([]);
  const [name, setName] = useState("");

  const addPlayer = () => {
    setPlayers([...players, { name, color: "bg-sky-300" }]);
    setName("");
  };

  return (
    <div className="text-center w-full h-full flex items-center justify-center flex-col">
      <h2 className="text-3xl font-bold mb-8">Ustawienia rozgrywki</h2>
      <ol>
        {players.map((player, index) => (
          <li
            key={index}
            onClick={() =>
              setPlayers(players.filter(p => p.name !== player.name))
            }
          >
            {player.name}
          </li>
        ))}
        <li>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            className="text-black mr-4"
          />
          <button onClick={addPlayer}>Dodaj</button>
        </li>
      </ol>
      <Link to="/game" state={{ players }}>
        <button className="mt-8 ring-4 ring-pattern-red ring-offset-4 ring-offset-pattern-blue-light px-6 py-3 rounded-lg hover:bg-pattern-red transition-colors cursor-pointer text-xl font-bold">
          Rozpocznij grę
        </button>
      </Link>
    </div>
  );
};
