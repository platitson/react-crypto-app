import { CryptoContextProvider } from "./context/cryptoContext";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <CryptoContextProvider>
      <Layout />
    </CryptoContextProvider>
  );
}

export default App;
