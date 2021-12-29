interface Props {
  name: string;
  fn: (payload?: number) => void;
  payload?: number;
}

export const Button = ({ name, fn, payload }: Props): JSX.Element => (
  <div className="relative" key={name}>
    <div className="absolute inset-0 bg-red-800 rounded-3xl" aria-hidden></div>
    <button
      className="relative bg-red-500 px-3 py-8 text-xl rounded-3xl shadow-lg w-full z-50 transition-transform -translate-y-1 hover:-translate-y-2 active:translate-y-0"
      onClick={() => fn(payload)}
    >
      {name}
    </button>
  </div>
);
