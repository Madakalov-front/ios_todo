import { store } from "@/app/store";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { AppRouter } from "../router";

const antdTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    colorPrimary: "#ffd60a",
    colorBgLayout: "#f2f2f7",
    colorBgContainer: "#ffffff",
    colorBorderSecondary: "rgba(60, 60, 67, 0.29)",
    borderRadius: 10,
    controlHeight: 44,
  },
  components: {
    Layout: {
      headerBg: "#ffffff",
      bodyBg: "#f2f2f7",
      siderBg: "#f2f2f7",
    },
  },
};

export function AppProviders() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        <BrowserRouter>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}
