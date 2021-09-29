import { KaszebscziMol } from "./lib/KaszebscziMol";
import { Client } from "boardgame.io/react";

const App = Client({ game: KaszebscziMol, numPlayers: 3, debug: true });

export default App;
