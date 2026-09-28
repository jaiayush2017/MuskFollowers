import { DISCLAIMER } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-normal text-muted-foreground", className)}>
      <span className="font-semibold uppercase tracking-wider text-foreground">Disclaimer. </span>
      {DISCLAIMER}
    </p>
  );
}
