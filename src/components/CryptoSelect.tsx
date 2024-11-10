import { Select as AntdSelect, Space } from "antd";
import { useCrypto } from "../context/cryptoContext";
import { useEffect, useState } from "react";
import { CoinInfoModal } from "./CoinInfoModal";
import { Crypto } from "../services/types";

export function CryptoSelect() {
  const { crypto } = useCrypto();
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<Crypto>();

  useEffect(() => {
    document.addEventListener("keypress", onKeyPress);
    return () => document.removeEventListener("keypress", onKeyPress);
  }, []);

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "/") {
      setSelectOpen((selectOpen) => !selectOpen);
    }
  };

  const handleSelect = (value: string) => {
    setSelectedCoin(crypto.find((c) => c.id === value));
    setModalOpen(true);
    setSelectOpen(false);
  };

  return (
    <>
      <AntdSelect
        style={{ width: 250 }}
        placeholder="press / to open"
        onSelect={handleSelect}
        open={selectOpen}
        onClick={() => setSelectOpen(true)}
        onBlur={() => setSelectOpen(false)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <CoinInfoModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        coin={selectedCoin}
      />
    </>
  );
}
