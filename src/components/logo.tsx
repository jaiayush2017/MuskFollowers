import { Link } from "@tanstack/react-router";
import { APP_NAME, TAGLINE } from "@/lib/content";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export function Logo({ className, markClassName, wordmark = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 text-foreground no-underline", className)}
      aria-label={`${APP_NAME} home`}
    >
      <img
        src="/images/logo-mark.jpg"
        alt=""
        className={cn("size-12 rounded-full object-cover ring-1 ring-primary/50", markClassName)}
      />
      {wordmark ? (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="font-display text-lg font-semibold tracking-tight">{APP_NAME}</span>
          <span className="font-display text-xs font-medium italic tracking-wide text-primary">
            {TAGLINE}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
