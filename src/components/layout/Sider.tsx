import { Layout, Tag } from "antd";
import { Card, Statistic, List, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { capitalize } from "../../utils";
import { CryptoContext } from "../../context/cryptoContext";

const AntdSider = Layout.Sider;

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

export function Sider() {
  const { assets } = useContext(CryptoContext);

  return (
    <AntdSider width="25%" style={siderStyle}>
      {assets.map((asset) => (
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
