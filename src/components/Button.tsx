import { ReactElement } from "react";

interface Props {
  name: string;
  fn: (payload?: number) => void;
  payload?: number;
}

export const Button = ({ name, fn, payload }: Props): ReactElement => (
  <div className="relative" key={name}>
    <div className="absolute -inset-2 bg-red-500 rounded-3xl"></div>
    <button
      className="relative bg-pattern-blue-light px-3 py-8 text-lg rounded-3xl shadow-lg w-full z-50"
      onClick={() => fn(payload)}
    >
      {name}
    </button>
  </div>
);
