import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMediaQuery } from "../hooks/useMediaQuery";

const DarkModeContext = createContext({
  isDark: false,
  setIsDark: (value: boolean) => {},
});
export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage<boolean>("dark");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const enabled = isDark ?? prefersDark;

  useEffect(() => {
    document.body.classList.toggle("dark", enabled);
  }, [enabled]);

  return (
    <DarkModeContext.Provider value={{ isDark: enabled, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};
