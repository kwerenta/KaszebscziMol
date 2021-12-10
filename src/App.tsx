import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Client } from "boardgame.io/react";
import { KaszebscziMol } from "./lib/KaszebscziMol";
import { Game } from "./components/Game";
import { Setup } from "./components/Setup";

const App = () => {
  const GameClient = Client({
    game: KaszebscziMol([
      { name: "Kamil", color: "bg-sky-500" },
      { name: "Dawid", color: "bg-red-300" },
      { name: "Leokadia", color: "bg-fuchsia-500" },
      { name: "Piotr", color: "bg-slate-100" },
    ]),
    numPlayers: 4,
    board: Game,
    debug: true,
  });
  return (
    <div className="bg-pattern-blue-light text-white h-screen w-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/game" element={<GameClient />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
