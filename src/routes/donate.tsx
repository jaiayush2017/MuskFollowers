import { createFileRoute } from "@tanstack/react-router";
import { CryptoMark } from "@/components/crypto-mark";
import { DonationWidget } from "@/components/donation-widget";
import type { CauseId, Ticker } from "@/lib/wallets";

type DonateSearch = {
  cause?: CauseId;
  amount?: number;
};

function parseSearch(search: Record<string, unknown>): DonateSearch {
  const cause = search.cause;
  const amount = Number(search.amount);
  return {
    cause: cause === "stem" || cause === "energy" || cause === "space" ? cause : undefined,
    amount: Number.isFinite(amount) && amount >= 5 ? amount : undefined,
  };
}

const ACCEPTED: Ticker[] = ["BTC", "ETH", "BNB", "SOL", "DOGE", "USDT", "USDC", "USDG"];

export const Route = createFileRoute("/donate")({
  validateSearch: parseSearch,
  component: DonatePage,
});

function DonatePage() {
  const { cause, amount } = Route.useSearch();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Donate crypto</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Send from your wallet
        </h1>
        <p className="mt-4 text-base leading-normal text-muted-foreground">
          Choose a cause, then pay from your wallet. We accept BTC, ETH, BNB, SOL, DOGE, USDT, USDC, and USDG.
        </p>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2">
        {ACCEPTED.map((ticker) => (
          <li
            key={ticker}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium"
          >
            <CryptoMark ticker={ticker} />
            {ticker}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <DonationWidget initialCause={cause ?? "stem"} initialAmount={amount ?? 50} />
      </div>
    </main>
  );
}
