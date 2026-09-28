import { useMemo } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { BASELINE, tallyImpact } from "@/lib/impact";
import { cn, formatCount, formatUsd } from "@/lib/utils";
import { useDonations } from "@/store/donations";

const STATS = [
  { key: "usd" as const, label: "Gifts directed", money: true, tone: "text-primary" },
  { key: "students" as const, label: "Science seats", tone: "text-stem" },
  { key: "watts" as const, label: "Clean watts", tone: "text-energy" },
  { key: "lessons" as const, label: "Space lessons", tone: "text-space" },
];

export function ImpactStats({ compact = false }: { compact?: boolean }) {
  const hydrated = useHydrated();
  const gifts = useDonations((state) => state.gifts);
  const totals = useMemo(() => tallyImpact(hydrated ? gifts : []), [gifts, hydrated]);

  return (
    <dl className={compact ? "grid grid-cols-2 gap-6 sm:grid-cols-4" : "grid grid-cols-2 gap-8 md:grid-cols-4"}>
      {STATS.map((stat) => (
        <div key={stat.key} className="min-w-0">
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {stat.label}
          </dt>
          <dd className={cn("mt-2 font-display text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl", stat.tone)}>
            {"money" in stat && stat.money
              ? formatUsd(totals[stat.key] ?? BASELINE.usd)
              : formatCount(totals[stat.key])}
          </dd>
        </div>
      ))}
    </dl>
  );
}
