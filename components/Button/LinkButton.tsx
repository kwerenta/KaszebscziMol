import Link, { LinkProps } from "next/link";
import { Button, ButtonProps } from "../Button";

interface Props extends Omit<LinkProps, "passHref"> {
  disabled?: boolean;
  text: string;
  color?: ButtonProps["color"];
}

export const LinkButton = ({
  disabled,
  text,
  color = "green",
  ...linkProps
}: Props) => (
  <Link {...linkProps} passHref>
    <a className={disabled ? "pointer-events-none" : undefined}>
      <Button
        className="px-8 py-4 font-bold"
        color={color}
        text={text}
        disabled={disabled}
      />
    </a>
  </Link>
);
