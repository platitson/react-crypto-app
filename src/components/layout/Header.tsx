import { Button, Layout } from "antd";
import { CryptoSelect } from "../CryptoSelect";
import { useState } from "react";
import { Drawer } from "../Drawer";
import { CoinInfoModal } from "../CoinInfoModal";
import { useCrypto } from "../../context/cryptoContext";
import { Crypto } from "../../services/types";

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
  const { crypto } = useCrypto();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<Crypto>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelectedCoin(crypto.find((c) => c.id === value));
    setModalOpen(true);
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AntdHeader style={headerStyle}>
        <CryptoSelect onSelect={handleSelect} />
        <Button type="primary" onClick={showDrawer}>
          Add asset
        </Button>
      </AntdHeader>
      <Drawer open={drawerOpen} onClose={closeDrawer} />
      <CoinInfoModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        coin={selectedCoin}
      />
    </>
  );
}
