import { useState } from "react";

export interface ButtonProps {
  text: string;
  type: "move" | "CTA";
  color: "green" | "red" | "orange";
  onClick?: (payload?: number) => void;
  payload?: number;
  disabled?: boolean;
}

export const Button = ({
  text,
  onClick = () => {},
  payload,
  type,
  color,
  disabled,
}: ButtonProps): JSX.Element => {
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
      disabled={disabled}
      className="group relative"
      key={text}
      onClick={() => setIsClicked(true)}
      onAnimationEnd={() => {
        setIsClicked(false);
        onClick(payload);
      }}
    >
      <div
        className={`peer group-disabled:bg-gray-dark group-disabled:peer-hover:bg-gray-dark absolute inset-0 rounded-3xl ${colors[color].dark}`}
        aria-hidden
      />
      <div
        className={`${
          colors[color].light
        } group-disabled:bg-gray-light z-50 w-full -translate-y-2 rounded-3xl text-xl text-gray-800 shadow-lg transition-transform hover:-translate-y-3 focus:-translate-y-3 group-disabled:text-gray-600 group-disabled:hover:-translate-y-2 peer-hover:-translate-y-3 group-disabled:peer-hover:-translate-y-2 ${
          type === "move" ? "px-4 py-8" : "px-8 py-4 font-bold"
        } ${isClicked && "animate-press"}`}
      >
        {text}
      </div>
    </button>
  );
};
