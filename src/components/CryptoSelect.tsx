import { Select as AntdSelect, Space } from "antd";
import { useCrypto } from "../context/cryptoContext";
import { useEffect, useState } from "react";

type CryptoSelectProps = {
  onSelect?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
};

export function CryptoSelect(props: CryptoSelectProps) {
  const { crypto } = useCrypto();
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keypress", onKeyPress);
    return () => document.removeEventListener("keypress", onKeyPress);
  }, []);

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "/") {
      setSelectOpen((selectOpen) => !selectOpen);
    }
  };

  const onSelectHandler = (value: string) => {
    props.onSelect && props.onSelect(value);
    setSelectOpen(false);
  };

  return (
    <AntdSelect
      style={{ width: 250, ...props.style }}
      placeholder={props.placeholder ?? "press / to open"}
      onSelect={onSelectHandler}
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
  );
}
