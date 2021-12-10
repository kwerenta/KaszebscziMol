import { Link } from "react-router-dom";

export const Setup = () => (
  <div className="text-center w-full h-full flex items-center justify-center flex-col">
    <h2 className="text-3xl font-bold mb-8">Ustawienia rozgrywki</h2>

    <Link to="/game" state={{}}>
      <button className="ring-4 ring-pattern-red ring-offset-4 ring-offset-pattern-blue-light px-6 py-3 rounded-lg hover:bg-pattern-red transition-colors cursor-pointer text-xl font-bold">
        Rozpocznij grę
      </button>
    </Link>
  </div>
);
