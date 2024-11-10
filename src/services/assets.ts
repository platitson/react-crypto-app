import { Asset } from "./types";

// Assets contain user crypto wallet data
// TODO: also put it somewhere?

export const assetsData: Asset[] = [
  {
    id: "bitcoin",
    amount: 0.02,
    price: 26244,
    date: new Date(),
  },
  {
    id: "ethereum",
    amount: 5,
    price: 2400,
    date: new Date(),
  },
];
