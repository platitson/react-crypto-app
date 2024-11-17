import { Modal as AntdModal, Divider, Flex, Tag, Typography } from "antd";
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
      <Flex align="center">
        <img
          src={coin?.icon}
          alt={coin?.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          ({coin?.symbol}) {coin?.name}
        </Typography.Title>
      </Flex>
      <Divider />
      <Typography.Paragraph>
        {coin?.priceChange1h && (
          <>
            <Typography.Text strong>1 hour: </Typography.Text>
            <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
              {coin.priceChange1h}%
            </Tag>
          </>
        )}
        {coin?.priceChange1d && (
          <>
            <Typography.Text strong>1 day: </Typography.Text>
            <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
              {coin.priceChange1d}%
            </Tag>
          </>
        )}
        {coin?.priceChange1w && (
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
        {coin?.price.toFixed(5)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin?.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin?.marketCap}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Contract Address: </Typography.Text>
        {coin?.contractAddress}
      </Typography.Paragraph>
    </AntdModal>
  );
}
