import type { Ticker } from "@/lib/wallets";
import { cn } from "@/lib/utils";

type Props = {
  ticker: Ticker;
  className?: string;
};

const TONE: Record<Ticker, string> = {
  BTC: "bg-btc text-btc-foreground",
  ETH: "bg-eth text-eth-foreground",
  BNB: "bg-bnb text-bnb-foreground",
  SOL: "coin-sol",
  USDT: "bg-usdt text-usdt-foreground",
  USDC: "bg-usdc text-usdc-foreground",
  USDG: "bg-usdg text-usdg-foreground",
  DOGE: "bg-doge text-doge-foreground",
};

export function CryptoMark({ ticker, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full",
        TONE[ticker],
        className,
      )}
      aria-hidden
    >
      {mark(ticker)}
    </span>
  );
}

function mark(ticker: Ticker) {
  switch (ticker) {
    case "BTC":
      return (
        <svg viewBox="0 0 24 24" className="size-[70%]" fill="currentColor">
          <path d="M14.3 11.4c.9-.5 1.5-1.3 1.3-2.4-.3-1.5-1.6-1.9-3.2-2.1V5.2h-1.5v1.6c-.4 0-.8 0-1.2.1V5.2H8.2v1.7H6.4l.3 1.7h1.3c.5 0 .7.3.7.7v5.4c0 .3-.1.6-.5.6H6.6l-.4 1.8h1.9V19h1.5v-1.7c.4 0 .8.1 1.2.1V19h1.5v-1.8c2.1-.2 3.6-.9 3.8-2.8.2-1.3-.5-2.1-1.6-2.5zM10.2 8.3c.9 0 2.7.1 2.7 1.4s-1.7 1.4-2.7 1.4V8.3zm0 7.5v-2.9c1.2 0 3.1.1 3.1 1.5s-1.8 1.4-3.1 1.4z" />
        </svg>
      );
    case "ETH":
      return (
        <svg viewBox="0 0 24 24" className="size-[72%]" fill="currentColor">
          <path d="M12 3.2 6.4 12.2 12 15.4l5.6-3.2L12 3.2z" opacity="0.85" />
          <path d="M12 16.4 6.4 13.1 12 20.8l5.6-7.7L12 16.4z" />
        </svg>
      );
    case "BNB":
      return (
        <svg viewBox="0 0 24 24" className="size-[70%]" fill="currentColor">
          <path d="M12 4.2 14.6 6.8 12 9.4 9.4 6.8 12 4.2zm-5.8 5.8L8.8 12 6.2 14.6 3.6 12 6.2 9.4zm11.6 0L20.4 12l-2.6 2.6L15.2 12l2.6-2.6zM12 10.2 14.8 13 12 15.8 9.2 13 12 10.2zm0 7.4 2.6 2.6L12 22.8l-2.6-2.6L12 17.6z" />
        </svg>
      );
    case "SOL":
      return (
        <svg viewBox="0 0 24 24" className="size-[70%]" fill="currentColor">
          <path d="M7.2 15.4h11.2l-2.4 2.6H4.8l2.4-2.6zm0-4.7h11.2L16 13.3H4.8l2.4-2.6zm2.4-4.7 2.4 2.6H4.8L7.2 6zm9.6 0L16.8 8.6h-7.2L12 6h7.2z" />
        </svg>
      );
    case "USDT":
      return (
        <svg viewBox="0 0 24 24" className="size-[70%]" fill="currentColor">
          <path d="M13 11.6v6.2c2.7-.2 4.7-1 4.7-2 0-1-2-1.8-4.7-2zm-2 0c-2.7.2-4.7 1-4.7 2s2 1.8 4.7 2v-4zm0-1.4V6.4H7.4V4.8h9.2v1.6H13v3.8c4 .2 7 1.4 7 2.8s-3 2.6-7 2.8v3.4h-2v-3.4c-4-.2-7-1.4-7-2.8s3-2.6 7-2.8z" />
        </svg>
      );
    case "USDC":
      return (
        <svg viewBox="0 0 24 24" className="size-[70%]" fill="currentColor">
          <path d="M12 4.2A7.8 7.8 0 1 0 19.8 12 7.8 7.8 0 0 0 12 4.2zm.8 11.7v.9h-1.6v-.9A3.4 3.4 0 0 1 8.4 13h1.5a2 2 0 0 0 2.1 1.6c.9 0 1.6-.5 1.6-1.2 0-.7-.6-1-1.8-1.3-1.8-.4-3.2-1-3.2-2.7 0-1.4 1-2.4 2.6-2.6V6.8h1.6v.9A3.1 3.1 0 0 1 15.5 11h-1.5a1.8 1.8 0 0 0-1.8-1.4c-.8 0-1.4.4-1.4 1.1 0 .7.6 1 1.9 1.3 1.8.4 3.1 1.1 3.1 2.8 0 1.5-1.1 2.5-2.8 2.7z" />
        </svg>
      );
    case "USDG":
      return (
        <svg viewBox="0 0 24 24" className="size-[78%]" fill="currentColor">
          <path d="M12 5a7 7 0 1 0 6.6 9.3h-2.2A5.2 5.2 0 1 1 12 6.8c1.6 0 3 .7 4 1.9l-2.4.1v2.2h5.6V5.4h-2.1l.1 1.4A7 7 0 0 0 12 5z" />
        </svg>
      );
    case "DOGE":
      return (
        <svg viewBox="0 0 24 24" className="size-[78%]" fill="currentColor">
          <path d="M10.2 6.4h3.2c2.8 0 4.6 1.7 4.6 4.2 0 2.6-1.8 4.3-4.6 4.3h-1.7V17H10.2V6.4zm1.6 6.9h1.5c1.7 0 2.7-.9 2.7-2.6s-1-2.6-2.7-2.6h-1.5v5.2z" />
        </svg>
      );
  }
}
