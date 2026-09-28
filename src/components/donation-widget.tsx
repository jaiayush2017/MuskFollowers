import { useMemo, useState } from "react";
import { Check, Copy, GraduationCap, Rocket, Sun } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { CryptoMark } from "@/components/crypto-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { giftFootprint } from "@/lib/impact";
import { cn, formatUsd } from "@/lib/utils";
import {
  CHAINS,
  PRESET_AMOUNTS,
  coinsOn,
  formatCoinAmount,
  paymentUri,
  usdToCoin,
  type CauseId,
  type ChainId,
  type CoinId,
} from "@/lib/wallets";
import { useDonations } from "@/store/donations";

const CAUSES: { id: CauseId; title: string; hint: string; tone: string; icon: typeof Rocket }[] = [
  { id: "stem", title: "Science", hint: "Labs and kits", tone: "text-stem", icon: GraduationCap },
  { id: "energy", title: "Energy", hint: "Clean watts", tone: "text-energy", icon: Sun },
  { id: "space", title: "Space", hint: "Classroom Mars", tone: "text-space", icon: Rocket },
];

type Props = {
  initialCause?: CauseId;
  initialAmount?: number;
};

export function DonationWidget({ initialCause = "stem", initialAmount = 50 }: Props) {
  const addGift = useDonations((state) => state.addGift);
  const [cause, setCause] = useState<CauseId>(initialCause);
  const [amount, setAmount] = useState(initialAmount);
  const [custom, setCustom] = useState(
    PRESET_AMOUNTS.includes(initialAmount as (typeof PRESET_AMOUNTS)[number])
      ? ""
      : String(initialAmount),
  );
  const [chain, setChain] = useState<ChainId>("bitcoin");
  const [coinId, setCoinId] = useState<CoinId>("btc");
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);

  const assets = coinsOn(chain);
  const coin = assets.find((item) => item.id === coinId) ?? assets[0];
  const amountCoin = usdToCoin(amount, coin);
  const uri = paymentUri(coin, amountCoin);
  const footprint = useMemo(() => giftFootprint(amount, cause), [amount, cause]);

  function selectChain(next: ChainId) {
    setChain(next);
    const first = coinsOn(next)[0];
    setCoinId(first.id);
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(coin.address);
      setCopied(true);
      toast(`Address copied. Send ${coin.ticker} on ${coin.network}.`);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast("Copy failed. Select the address instead.");
    }
  }

  function applyCustom(value: string) {
    setCustom(value);
    const next = Number(value);
    if (Number.isFinite(next) && next >= 5) setAmount(Math.min(next, 100_000));
  }

  function recordGift() {
    addGift({ usd: amount, cause, coin: coin.id });
    setDone(true);
  }

  const causeTitle = CAUSES.find((item) => item.id === cause)?.title ?? cause;

  if (done) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Donate crypto</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">Thank you.</h2>
        <p className="mt-3 max-w-md text-base leading-normal text-muted-foreground">
          We noted your {formatUsd(amount)} {coin.ticker} gift toward {causeTitle} on this device.
          The chain is the receipt.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-foreground">
          {footprint.students > 0 ? <li>{footprint.students} science seats</li> : null}
          {footprint.watts > 0 ? <li>{footprint.watts} clean-energy units</li> : null}
          {footprint.lessons > 0 ? <li>{footprint.lessons} space lessons</li> : null}
        </ul>
        <Button className="mt-8" variant="outline" onClick={() => setDone(false)}>
          Give another gift
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 rounded-xl border border-border bg-card p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">Donate crypto</h2>
          <p className="mt-2 text-sm leading-normal text-muted-foreground">
            Pick a cause, amount, and asset. Scan or copy — then send from your wallet.
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Cause</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {CAUSES.map((item) => {
              const Icon = item.icon;
              const selected = cause === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCause(item.id)}
                  className={cn(
                    "flex min-h-11 flex-col items-start rounded-lg border px-3 py-3 text-left transition-colors duration-150",
                    selected
                      ? "border-primary bg-secondary text-foreground"
                      : "border-border bg-background text-foreground hover:bg-secondary",
                  )}
                >
                  <Icon className={cn("size-4", item.tone)} />
                  <span className="mt-2 text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.hint}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Amount in USD</legend>
          <div className="flex flex-wrap gap-2">
            {PRESET_AMOUNTS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustom("");
                }}
                className={cn(
                  "min-h-11 min-w-16 rounded-md border px-4 text-sm font-medium tabular-nums transition-colors duration-150",
                  amount === value && custom === ""
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:bg-secondary",
                )}
              >
                {formatUsd(value)}
              </button>
            ))}
          </div>
          <div className="max-w-xs space-y-2">
            <Label htmlFor="custom-amount">Custom</Label>
            <Input
              id="custom-amount"
              inputMode="decimal"
              placeholder="Other amount"
              value={custom}
              onChange={(event) => applyCustom(event.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Network</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {CHAINS.map((item) => {
              const selected = chain === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectChain(item.id)}
                  className={cn(
                    "flex min-h-11 items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors duration-150",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-secondary",
                  )}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Asset</legend>
          <div className="flex flex-wrap gap-2">
            {assets.map((item) => {
              const selected = coin.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCoinId(item.id)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors duration-150",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-secondary",
                  )}
                >
                  <CryptoMark ticker={item.ticker} />
                  <span>{item.ticker}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col rounded-lg border border-border bg-background p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {coin.network}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums tracking-tight">
              {formatCoinAmount(amountCoin, coin)} {coin.ticker}
            </p>
            <p className="text-sm text-muted-foreground">about {formatUsd(amount)}</p>
          </div>
          <CryptoMark ticker={coin.ticker} className="size-8 text-sm" />
        </div>

        <div className="mx-auto my-6 rounded-md bg-card p-3">
          <QRCodeSVG value={uri} size={180} bgColor="#0e2430" fgColor="#eef7fb" level="M" />
        </div>

        <p className="break-all font-mono text-xs leading-relaxed text-muted-foreground">{coin.address}</p>

        <div className="mt-4 flex flex-col gap-2">
          <Button type="button" variant="outline" onClick={copyAddress}>
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy address"}
          </Button>
          <Button type="button" onClick={recordGift}>
            I've sent this gift
          </Button>
        </div>

        <p className="mt-4 text-xs leading-normal text-muted-foreground">
          Send only {coin.ticker} on {coin.network}. Other tokens or networks sent here may be lost.
          Rates are indicative.
        </p>
      </div>
    </div>
  );
}
