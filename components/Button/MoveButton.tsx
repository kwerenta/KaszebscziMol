import { Button } from ".";
import { ButtonProps } from "../Button";

interface Props {
  text: string;
  color: ButtonProps["color"];
  moveFn: () => void;
  disabled?: boolean;
}

export const MoveButton = ({ color, moveFn, text, disabled }: Props) => (
  <Button
    className="px-4 py-8"
    color={color}
    text={text}
    disabled={disabled}
    onClick={moveFn}
  />
);
