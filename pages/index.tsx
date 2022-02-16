import { MainFlower } from "../asstets/pattern/MainFlower";
import { Layout } from "../components/Layout";
import { LinkButton } from "../components/LinkButton";
import { useDarkMode } from "../contexts/useDarkModeContext";

export default function Home(): JSX.Element {
  const { isDark, setIsDark } = useDarkMode();
  return (
    <Layout>
      <header className="flex h-full w-full flex-1 flex-col items-center justify-center space-y-10 md:flex-initial">
        <input
          type="checkbox"
          className="absolute top-2 left-2 h-12 w-12"
          checked={isDark}
          onChange={e => setIsDark(e.currentTarget.checked)}
        />
        <MainFlower className="w-full max-w-sm drop-shadow-lg" />
        <h1 className="font-logo font- text-center text-7xl">
          Kaszëbsczi <br />
          Môl
        </h1>
        <LinkButton href="/setup" text="Zagraj" />
      </header>
    </Layout>
  );
}
