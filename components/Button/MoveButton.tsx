import { Button } from ".";
import { MoveFn } from "../../hooks/useWrappedMoves";
import { ButtonProps } from "../Button";

interface Props {
  text: string;
  color: ButtonProps["color"];
  fn: MoveFn;
  disabled?: boolean;
}

export const MoveButton = ({ color, fn, text, disabled }: Props) => (
  <Button
    className="px-4 py-8"
    color={color}
    text={text}
    disabled={disabled}
    onClick={fn}
  />
);
