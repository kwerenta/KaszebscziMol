import { Link } from "react-router-dom";
import { MainFlower } from "../asstets/pattern/MainFlower";
import { Button } from "./Button";

interface Props {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const Home = ({ dark, setDark }: Props): JSX.Element => {
  return (
    <header className="w-full h-full flex flex-col items-center justify-center space-y-10 flex-1 md:flex-initial">
      <input
        type="checkbox"
        className="absolute top-2 left-2 w-12 h-12"
        checked={dark}
        onChange={e => setDark(e.currentTarget.checked)}
      />
      <MainFlower className="w-full max-w-sm drop-shadow-sm-intense" />
      <h1 className="text-7xl font-logo font-bold drop-shadow-lg-intense text-center">
        Kaszëbsczi <br />
        Môl
      </h1>
      <Link to="/setup">
        <Button color="green" type="CTA" text="Rozpocznij grę" />
      </Link>
    </header>
  );
};
