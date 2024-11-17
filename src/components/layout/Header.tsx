import { Button, Layout } from "antd";
import { CryptoSelect } from "../CryptoSelect";
import { useState } from "react";
import { Drawer } from "../Drawer";

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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AntdHeader style={headerStyle}>
        <CryptoSelect />
        <Button type="primary" onClick={showDrawer}>
          Add asset
        </Button>
      </AntdHeader>
      <Drawer open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
