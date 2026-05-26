import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonDefault } from "../../shared/ui";
import Sider from "antd/es/layout/Sider";

export const MainLayout = () => {
  return (
    <Layout>
      <Header>Копия macOS «Заметки» на React + PWA</Header>
      <Layout>
        <Sider width="25%">
          <ul>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
            <li>3</li>
          </ul>
          <ButtonDefault icon={<PlusOutlined />}>
            Создать заметку
          </ButtonDefault>
        </Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
};
