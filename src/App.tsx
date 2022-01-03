import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameClient } from "./components/GameClient";
import { Home } from "./components/Home";
import { Setup } from "./components/Setup";

const App = () => {
  return (
    <div className="bg-white dark:bg-blue-gray-dark text-black dark:text-white h-screen w-screen flex items-center justify-center">
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
