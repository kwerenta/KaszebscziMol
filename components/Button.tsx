import { useState } from "react";

interface Props {
  text: string;
  type: "move" | "CTA";
  color: "green" | "red" | "orange";
  onClick?: (payload?: number) => void;
  payload?: number;
}

export const Button = ({
  text,
  onClick = () => {},
  payload,
  type,
  color,
}: Props): JSX.Element => {
  const colors: Record<typeof color, { light: string; dark: string }> = {
    green: {
      light: "bg-green-light",
      dark: "bg-green-dark",
    },
    red: {
      light: "bg-red-light",
      dark: "bg-red-dark",
    },
    orange: {
      light: "bg-orange-light",
      dark: "bg-orange-dark",
    },
  };
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button
      className="relative"
      key={text}
      onClick={() => setIsClicked(true)}
      onAnimationEnd={() => {
        setIsClicked(false);
        onClick(payload);
      }}
    >
      <div
        className={`peer absolute inset-0 rounded-3xl ${colors[color].dark}`}
        aria-hidden
      />
      <div
        className={`${
          colors[color].light
        } text-gray-800 text-xl rounded-3xl shadow-lg w-full z-50 transition-transform -translate-y-2 hover:-translate-y-3 focus:-translate-y-3 peer-hover:-translate-y-3 ${
          type === "move" ? "px-4 py-8" : "px-8 py-4 font-bold"
        } ${isClicked && "animate-press"}`}
      >
        {text}
      </div>
    </button>
  );
};