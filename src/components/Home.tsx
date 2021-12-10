import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Butterfly } from "../asstets/pattern/Butterfly";
import { Flower1 } from "../asstets/pattern/Flower1";
import { Flower2 } from "../asstets/pattern/Flower2";
import { Flower3 } from "../asstets/pattern/Flower3";
import { MainFlower } from "../asstets/pattern/MainFlower";

export const Home = (): ReactElement => {
  return (
    <div className="text-center w-full h-full flex">
      <div className="flex-1 relative hidden md:block">
        <Flower1 className="absolute bottom-6 left-1/2 w-28 drop-shadow-md-intense" />
        <Flower2 className="absolute top-1/4 left-8 w-32 drop-shadow-md-intense rotate-12" />
        <Flower3 className="absolute bottom-1/3 left-3/4 w-24 drop-shadow-md-intense" />
        <Butterfly className="absolute top-12 right-0 w-20 drop-shadow-md-intense rotate-90" />
      </div>
      <header className="w-7/12 max-w-3xl flex flex-col items-center justify-center space-y-10 flex-1 md:flex-initial">
        <MainFlower className="w-full max-w-sm drop-shadow-sm-intense" />
        <h1 className="text-7xl font-logo font-bold drop-shadow-lg-intense">
          Kaszëbsczi <br />
          Môl
        </h1>
        <Link to="/setup">
          <button className="ring-4 ring-pattern-red ring-offset-4 ring-offset-pattern-blue-light px-6 py-3 rounded-lg hover:bg-pattern-red transition-colors cursor-pointer text-xl font-bold">
            Rozpocznij grę
          </button>
        </Link>
      </header>
      <div className="flex-1 relative hidden md:block">
        <Flower1 className="absolute top-20 right-20 w-32 drop-shadow-md-intense -rotate-12" />
        <Flower2 className="absolute bottom-24 left-12 w-20 drop-shadow-md-intense" />
        <Flower3 className="absolute top-1/3 right-1/3 w-28 drop-shadow-md-intense" />
        <Butterfly className="absolute bottom-1/3 right-3/4 w-24 drop-shadow-md-intense" />
      </div>
    </div>
  );
};
