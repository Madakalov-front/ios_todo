import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Workspace } from "@/widgets/workspace";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import "./MainLayout.scss";

export const MainLayout = () => {
  return (
    <Layout className="ios-layout main-layout" style={{ height: "100vh" }}>
      <Header />
      <Layout className="main-layout__inner">
        <Sidebar />
        <Content className="main-layout__content">
          <Workspace />
        </Content>
      </Layout>
    </Layout>
  );
};
