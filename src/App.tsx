import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { Client } from "boardgame.io/react";
import { KaszebscziMol } from "./lib/KaszebscziMol";
import { Game } from "./components/Game";

const App = () => {
  const GameClient = Client({
    game: KaszebscziMol,
    numPlayers: 4,
    board: Game,
    debug: true,
  });

  return (
    <div className="bg-blue-600 text-white h-screen w-screen flex items-center justify-center">
      <Router>
        <Switch>
          <Route path="/game">
            <div className="flex-1">
              <GameClient />
            </div>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
