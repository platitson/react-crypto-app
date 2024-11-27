import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/cryptoContext";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const AntdContent = Layout.Content;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 64px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export function Content() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap: any = crypto.reduce((acc, coin) => {
    (acc as any)[coin.id] = coin.price;
    return acc;
  }, {});

  const walletPrice = assets
    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
    .reduce((acc, v) => (acc += v), 0)
    .toFixed(2);

  return (
    <AntdContent style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#FFF" }}>
        Portfolio: {walletPrice}$
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </AntdContent>
  );
}
