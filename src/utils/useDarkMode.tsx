import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMediaQuery } from "./useMediaQuery";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useLocalStorage<boolean>("dark");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const enabled = isDark ?? prefersDark;

  useEffect(() => {
    document.body.classList.toggle("dark", enabled);
  }, [enabled]);
  return [enabled, setIsDark] as const;
};
