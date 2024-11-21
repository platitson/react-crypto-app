import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getData } from "../services/data";
import { assetsData } from "../services/assets";
import { getPercentDifference } from "../utils";
import { Asset, Crypto } from "../services/types";

type CryptoContextType = {
  assets: Asset[];
  crypto: Crypto[];
  loading: boolean;
  addAsset?: (value: Asset) => void;
};

export const CryptoContext = createContext<CryptoContextType>({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }: { children: ReactNode }) {
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [assets, setAssets] = useState<Asset[]>(assetsData);

  function mapAssets(assets: Asset[]) {
    return assets.map((asset) => {
      const coin = crypto.find((c) => c.id === asset.id);
      if (coin) {
        setLoading(false);
        return {
          ...asset,
          isGrowing: asset.price < coin.price,
          growPercent: getPercentDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * (coin.price - asset.price),
        };
      } else {
        return asset;
      }
    });
  }

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

  useEffect(() => {
    setAssets(mapAssets(assets));
  }, [crypto]);

  const addAsset = (newAsset: Asset) => {
    setAssets((prev) => mapAssets([...prev, newAsset]));
  };

  return (
    <CryptoContext.Provider value={{ assets, crypto, loading, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export const useCrypto = () => {
  return useContext(CryptoContext);
};
