interface Props {
  text: string;
  fn: (payload?: number) => void;
  payload?: number;
}

export const Button = ({ text, fn, payload }: Props): JSX.Element => (
  <div className="relative" key={text}>
    <div className="absolute inset-0 bg-red-dark rounded-3xl" aria-hidden />
    <button
      className="text-black relative bg-red-light px-3 py-8 text-xl rounded-3xl shadow-lg w-full z-50 transition-transform -translate-y-2 hover:-translate-y-3 active:translate-y-0"
      onClick={() => fn(payload)}
    >
      {text}
    </button>
  </div>
);
