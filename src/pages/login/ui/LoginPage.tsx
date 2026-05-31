import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Card, Typography } from "antd";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import "./LoginPage.scss";

const { Title, Text } = Typography;

export function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <div className="login-page">
      <Card className="login-page__card" bordered={false}>
        <Title level={3} className="login-page__title">
          Заметки
        </Title>
        <Text type="secondary" className="login-page__subtitle">
          Войдите, чтобы открыть заметки
        </Text>
        <Text type="secondary" className="login-page__hint">
          Демо: login <code>demo</code>, password <code>demo</code>
        </Text>
        <LoginForm />
      </Card>
    </div>
  );
}
