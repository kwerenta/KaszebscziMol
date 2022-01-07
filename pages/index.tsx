import Link from "next/link";
import { MainFlower } from "../asstets/pattern/MainFlower";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { useDarkMode } from "../hooks/useDarkMode";

export default function Home(): JSX.Element {
  const [dark, setDark] = useDarkMode();
  return (
    <Layout>
      <header className="w-full h-full flex flex-col items-center justify-center space-y-10 flex-1 md:flex-initial">
        <input
          type="checkbox"
          className="absolute top-2 left-2 w-12 h-12"
          checked={dark}
          onChange={e => setDark(e.currentTarget.checked)}
        />
        <MainFlower className="w-full max-w-sm drop-shadow-lg" />
        <h1 className="text-7xl font-logo font- text-center">
          Kaszëbsczi <br />
          Môl
        </h1>
        <Link href="/setup" passHref>
          <a>
            <Button color="green" text="Zagraj" type="CTA" />
          </a>
        </Link>
      </header>
    </Layout>
  );
}
