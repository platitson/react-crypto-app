import { Layout as AntdLayout, Spin } from "antd";
import { Header } from "./Header";
import { Sider } from "./Sider";
import { Content } from "./Content";
import { useContext } from "react";
import { CryptoContext } from "../../context/cryptoContext";

export function Layout() {
  const { loading } = useContext(CryptoContext);

  return (
    <AntdLayout>
      <Header />
      <AntdLayout>
        <Sider />
        <Content />
      </AntdLayout>
      <Spin spinning={loading} fullscreen />
    </AntdLayout>
  );
}
