import { Layout } from "antd";

const AntdSider = Layout.Sider;

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#1677ff",
  padding: "1rem",
};

export function Sider() {
  return (
    <AntdSider width="25%" style={siderStyle}>
      Header
    </AntdSider>
  );
}
