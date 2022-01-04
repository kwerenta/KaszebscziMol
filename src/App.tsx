import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameClient } from "./components/GameClient";
import { Home } from "./components/Home";
import { Setup } from "./components/Setup";
import { useDarkMode } from "./utils/useDarkMode";

const App = () => {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="bg-white dark:bg-blue-gray-dark text-gray-800 dark:text-white h-screen w-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/game" element={<GameClient />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/" element={<Home dark={dark} setDark={setDark} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
