import { KaszebscziMol } from "./lib/KaszebscziMol";
import { Client } from "boardgame.io/react";
import { Board } from "./Board";

const App = Client({
  game: KaszebscziMol,
  numPlayers: 3,
  board: Board,
  debug: true,
});

export default App;
