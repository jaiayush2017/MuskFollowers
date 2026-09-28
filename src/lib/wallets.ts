export type ChainId = "bitcoin" | "ethereum" | "bsc" | "solana" | "robinhood" | "dogecoin";
export type CoinId =
  | "btc"
  | "eth"
  | "eth-usdt"
  | "eth-usdc"
  | "bnb"
  | "bsc-usdt"
  | "bsc-usdc"
  | "sol"
  | "sol-usdt"
  | "sol-usdc"
  | "rh-eth"
  | "rh-usdg"
  | "doge";
export type CauseId = "stem" | "energy" | "space";
export type Ticker = "BTC" | "ETH" | "BNB" | "SOL" | "USDT" | "USDC" | "USDG" | "DOGE";

export type Chain = {
  id: ChainId;
  name: string;
  standard: string;
  eip155?: number;
};

export type Coin = {
  id: CoinId;
  chain: ChainId;
  name: string;
  ticker: Ticker;
  network: string;
  usd: number;
  decimals: number;
  address: string;
  native: boolean;
};

const EVM = "0xAC2b5a5f42Ca815cadA0997eBce187795c323Aa7";
const BITCOIN = "bc1q9mqel09aux434729hj3a7vzktsyzfxxfq70ufu";
const SOLANA = "A3iu8kXgz9fo7jkPuT4KtK1q3oMJ2MRCa21ETrGevVYp";
const DOGE = "DG1q9f98EauXkd9c7KzL6PRhyh5nyW4fAc";

export const CHAINS: Chain[] = [
  { id: "bitcoin", name: "Bitcoin", standard: "BTC" },
  { id: "ethereum", name: "Ethereum", standard: "ERC-20", eip155: 1 },
  { id: "bsc", name: "BNB", standard: "BEP-20", eip155: 56 },
  { id: "solana", name: "Solana", standard: "Solana" },
  { id: "robinhood", name: "Robinhood", standard: "L2", eip155: 4663 },
  { id: "dogecoin", name: "Dogecoin", standard: "DOGE" },
];

export const COINS: Coin[] = [
  {
    id: "btc",
    chain: "bitcoin",
    name: "Bitcoin",
    ticker: "BTC",
    network: "Bitcoin",
    usd: 108_400,
    decimals: 8,
    address: BITCOIN,
    native: true,
  },
  {
    id: "eth",
    chain: "ethereum",
    name: "Ether",
    ticker: "ETH",
    network: "Ethereum",
    usd: 4_180,
    decimals: 6,
    address: EVM,
    native: true,
  },
  {
    id: "eth-usdt",
    chain: "ethereum",
    name: "Tether",
    ticker: "USDT",
    network: "Ethereum · ERC-20",
    usd: 1,
    decimals: 2,
    address: EVM,
    native: false,
  },
  {
    id: "eth-usdc",
    chain: "ethereum",
    name: "USD Coin",
    ticker: "USDC",
    network: "Ethereum · ERC-20",
    usd: 1,
    decimals: 2,
    address: EVM,
    native: false,
  },
  {
    id: "bnb",
    chain: "bsc",
    name: "BNB",
    ticker: "BNB",
    network: "BNB Smart Chain",
    usd: 620,
    decimals: 6,
    address: EVM,
    native: true,
  },
  {
    id: "bsc-usdt",
    chain: "bsc",
    name: "Tether",
    ticker: "USDT",
    network: "BNB Chain · BEP-20",
    usd: 1,
    decimals: 2,
    address: EVM,
    native: false,
  },
  {
    id: "bsc-usdc",
    chain: "bsc",
    name: "USD Coin",
    ticker: "USDC",
    network: "BNB Chain · BEP-20",
    usd: 1,
    decimals: 2,
    address: EVM,
    native: false,
  },
  {
    id: "sol",
    chain: "solana",
    name: "Solana",
    ticker: "SOL",
    network: "Solana",
    usd: 186,
    decimals: 4,
    address: SOLANA,
    native: true,
  },
  {
    id: "sol-usdt",
    chain: "solana",
    name: "Tether",
    ticker: "USDT",
    network: "Solana",
    usd: 1,
    decimals: 2,
    address: SOLANA,
    native: false,
  },
  {
    id: "sol-usdc",
    chain: "solana",
    name: "USD Coin",
    ticker: "USDC",
    network: "Solana",
    usd: 1,
    decimals: 2,
    address: SOLANA,
    native: false,
  },
  {
    id: "rh-eth",
    chain: "robinhood",
    name: "Ether",
    ticker: "ETH",
    network: "Robinhood Chain",
    usd: 4_180,
    decimals: 6,
    address: EVM,
    native: true,
  },
  {
    id: "rh-usdg",
    chain: "robinhood",
    name: "Global Dollar",
    ticker: "USDG",
    network: "Robinhood Chain",
    usd: 1,
    decimals: 2,
    address: EVM,
    native: false,
  },
  {
    id: "doge",
    chain: "dogecoin",
    name: "Dogecoin",
    ticker: "DOGE",
    network: "Dogecoin",
    usd: 0.18,
    decimals: 8,
    address: DOGE,
    native: true,
  },
];

export const PRESET_AMOUNTS = [25, 50, 100, 250] as const;

export function coinsOn(chain: ChainId) {
  return COINS.filter((coin) => coin.chain === chain);
}

export function coinLabel(id: string) {
  const coin = COINS.find((item) => item.id === id);
  if (!coin) return id.toUpperCase();
  return `${coin.ticker} · ${coin.network}`;
}

export function usdToCoin(usd: number, coin: Coin) {
  return usd / coin.usd;
}

export function formatCoinAmount(amount: number, coin: Coin) {
  return amount.toFixed(coin.decimals);
}

function toWei(amount: number): string {
  const [whole, fraction = "0"] = amount.toFixed(18).split(".");
  return (BigInt(whole) * 10n ** 18n + BigInt(fraction)).toString();
}

export function paymentUri(coin: Coin, amountCoin: number) {
  const amount = formatCoinAmount(amountCoin, coin);
  const chain = CHAINS.find((item) => item.id === coin.chain);
  if (coin.chain === "bitcoin") return `bitcoin:${coin.address}?amount=${amount}`;
  if (coin.chain === "dogecoin") return `dogecoin:${coin.address}?amount=${amount}`;
  if (coin.chain === "solana") {
    return coin.native ? `solana:${coin.address}?amount=${amount}` : coin.address;
  }
  if (coin.native && chain?.eip155) {
    const id = chain.eip155 === 1 ? "" : `@${chain.eip155}`;
    return `ethereum:${coin.address}${id}?value=${toWei(amountCoin)}`;
  }
  return coin.address;
}
