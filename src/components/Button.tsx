import { ReactElement } from "react";

interface Props {
  name: string;
  fn: (payload?: number) => void;
  payload?: number;
}

export const Button = ({ name, fn, payload }: Props): ReactElement => (
  <div className="relative" key={name}>
    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-yellow-300 rounded-lg blur-sm"></div>
    <button
      className="relative bg-blue-700 px-3 py-2 text-lg rounded-lg shadow-md w-full"
      onClick={() => fn(payload)}
    >
      {name}
    </button>
  </div>
);
