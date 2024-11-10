import { Layout, Tag } from "antd";
import { Card, Statistic, List, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Asset, Crypto } from "../../services/types";
import { assetsData } from "../../services/assets";
import { capitalize, getPercentDifference } from "../../utils";

const AntdSider = Layout.Sider;

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

interface SiderProps {
  cryptoData: Crypto[];
}

export function Sider(props: SiderProps) {
  const [assets, setAssets] = useState<Asset[]>(assetsData);

  useEffect(() => {
    setAssets(
      assets.map((asset) => {
        const coin = props.cryptoData.find((c) => c.id === asset.id);
        if (coin) {
          return {
            ...asset,
            isGrowing: asset.price < coin.price,
            growPercent: getPercentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * (coin.price - asset.price),
          };
        } else {
          return {
            ...asset,
            notFound: true,
          };
        }
      })
    );
  }, [crypto]);

  return (
    <AntdSider width="25%" style={siderStyle}>
      {assets
        .filter((asset) => !asset.notFound)
        .map((asset) => (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{
                color: asset.isGrowing ? "#3f8600" : "#cf1322",
              }}
              prefix={
                asset.isGrowing ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
              suffix="%"
            />
            <List
              size="small"
              dataSource={[
                { title: "Asset Amount", value: asset.amount, noEdit: true },
                {
                  title: "Total Profit",
                  value: `${asset.totalProfit?.toFixed(2)}$`,
                  withTag: true,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.isGrowing ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    <Typography.Text
                      type={
                        !item.noEdit
                          ? asset.isGrowing
                            ? "success"
                            : "danger"
                          : undefined
                      }
                    >
                      {item.value}
                    </Typography.Text>
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))}
    </AntdSider>
  );
}
