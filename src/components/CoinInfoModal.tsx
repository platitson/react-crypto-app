import { Modal as AntdModal, Tag, Typography } from "antd";
import { Crypto } from "../services/types";
import { CoinInfoHeader } from "./CoinInfoHeader";

type CoinInfoModalProps = {
  open: boolean;
  coin?: Crypto;
  onCancel: () => void;
};

export function CoinInfoModal(props: CoinInfoModalProps) {
  const { open, onCancel, coin } = props;

  if (!coin) return;

  return (
    <AntdModal open={open} onCancel={onCancel} footer={null}>
      <CoinInfoHeader coin={coin} />
      <Typography.Paragraph>
        {coin.priceChange1h && (
          <>
            <Typography.Text strong>1 hour: </Typography.Text>
            <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
              {coin.priceChange1h}%
            </Tag>
          </>
        )}
        {coin.priceChange1d && (
          <>
            <Typography.Text strong>1 day: </Typography.Text>
            <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
              {coin.priceChange1d}%
            </Tag>
          </>
        )}
        {coin.priceChange1w && (
          <>
            <Typography.Text strong>1 week: </Typography.Text>
            <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
              {coin.priceChange1w}%
            </Tag>
          </>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toFixed(5)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin.marketCap}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Contract Address: </Typography.Text>
        {coin.contractAddress}
      </Typography.Paragraph>
    </AntdModal>
  );
}
