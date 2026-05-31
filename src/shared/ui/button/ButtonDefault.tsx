import { Button } from "antd";
import type { ButtonProps } from "antd";

interface ButtonDefaultProps extends ButtonProps {
  children?: React.ReactNode;
}

export const ButtonDefault = ({
  children,
  className,
  ...restProps
}: ButtonDefaultProps) => {
  return (
    <Button
      {...restProps}
      type="primary"
      className={["ios-btn-primary", className].filter(Boolean).join(" ")}
    >
      {children}
    </Button>
  );
};
