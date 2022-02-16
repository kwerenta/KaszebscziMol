import Link, { LinkProps } from "next/link";
import { Button, ButtonProps } from "./Button";

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
      <Button color={color} text={text} type="CTA" disabled={disabled} />
    </a>
  </Link>
);
