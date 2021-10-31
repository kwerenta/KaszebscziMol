import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const Home = (): ReactElement => {
  return (
    <div className="text-center grid place-items-center w-full h-full">
      <h1 className="text-8xl">Kaszëbsczi Môl</h1>
      <Link to="/game">
        <div className="bg-red-800 px-8 py-4 rounded hover:bg-red-600 transition-colors cursor-pointer">
          Rozpocznij grę
        </div>
      </Link>
    </div>
  );
};
