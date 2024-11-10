import { Modal as AntdModal } from "antd";
import { Crypto } from "../services/types";

type CoinInfoModalProps = {
  open: boolean;
  coin?: Crypto;
  onCancel: () => void;
};

export function CoinInfoModal(props: CoinInfoModalProps) {
  const { open, onCancel, coin } = props;
  return (
    <AntdModal open={open} onCancel={onCancel} footer={null}>
      <p>{coin?.name}</p>
    </AntdModal>
  );
}
