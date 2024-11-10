import { Layout } from "antd";
import { Header, Sider, Content } from "./components/layout";

function App() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Content />
      </Layout>
    </Layout>
  );
}

export default App;
