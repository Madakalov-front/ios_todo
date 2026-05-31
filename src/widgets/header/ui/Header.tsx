import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AntdHeader className="header">
      <span className="header__title">Заметки</span>
      <Button type="link" onClick={handleLogout} className="header__logout">
        Выйти
      </Button>
    </AntdHeader>
  );
};
