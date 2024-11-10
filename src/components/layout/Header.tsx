import { Button, Layout } from "antd";
import { CryptoSelect } from "../CryptoSelect";

const AntdHeader = Layout.Header;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export function Header() {
  return (
    <AntdHeader style={headerStyle}>
      <CryptoSelect />
      <Button type="primary">Add asset</Button>
    </AntdHeader>
  );
}
