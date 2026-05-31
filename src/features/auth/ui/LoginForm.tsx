import { useAuth } from "@/app/providers/AuthProvider";
import { ButtonDefault } from "@/shared/ui";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  login: string;
  password: string;
}

export function LoginForm() {
  const [form] = Form.useForm<LoginFormValues>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    const ok = login(values.login.trim(), values.password);
    if (!ok) {
      message.error("Неверный логин или пароль");
      return;
    }
    message.success("Добро пожаловать!");
    navigate("/notes", { replace: true });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{ login: "demo", password: "demo" }}
    >
      <Form.Item
        label="Логин"
        name="login"
        rules={[{ required: true, message: "Введите логин" }]}
      >
        <Input autoComplete="username" size="large" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password autoComplete="current-password" size="large" />
      </Form.Item>
      <Form.Item>
        <ButtonDefault htmlType="submit" block size="large">
          Войти
        </ButtonDefault>
      </Form.Item>
    </Form>
  );
}
