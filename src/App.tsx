import { Layout, Spin } from "antd";
import { Header, Sider, Content } from "./components/layout";
import { useEffect, useState } from "react";
import { getData } from "./services/data";
import { Crypto } from "./services/types";

function App() {
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    async function preload() {
      getData().then((result) => {
        setCrypto(result.result);
        setLoading(false);
      });
    }
    preload();
  }, []);

  return (
    <Layout>
      <Header />
      <Layout>
        {crypto.length > 0 && <Sider cryptoData={crypto} />}
        <Content />
      </Layout>
      <Spin spinning={loading} fullscreen />
    </Layout>
  );
}

export default App;
