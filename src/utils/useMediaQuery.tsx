import { useEffect, useState } from "react";

export const useMediaQuery = (mediaQuery: string) => {
  const [matches, setMatches] = useState<boolean>(
    window.matchMedia(mediaQuery).matches
  );
  const handleChange = () => setMatches(window.matchMedia(mediaQuery).matches);

  useEffect(() => {
    const matchMedia = window.matchMedia(mediaQuery);

    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaQuery]);

  return matches;
};
