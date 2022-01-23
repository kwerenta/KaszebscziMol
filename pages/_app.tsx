import { AppProps } from "next/app";
import Head from "next/head";
import { DarkModeProvider } from "../contexts/useDarkModeContext";
import "../global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title key="title">Kaszëbsczi Môl</title>
      </Head>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </>
  );
}
