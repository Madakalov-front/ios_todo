import { Button } from "antd";
import type { ButtonProps } from "antd";

interface ButtonDefaultProps extends ButtonProps {
  children?: React.ReactNode;
}

export const ButtonDefault = ({
  children,
  ...restProps
}: ButtonDefaultProps) => {
  return (
    <Button {...restProps} type="dashed" shape="round">
      {children || "Создать заметку"}
    </Button>
  );
};
