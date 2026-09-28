import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { DOMAIN, X_HANDLE, X_URL } from "@/lib/content";

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-normal text-muted-foreground">
            Independent supporters around the world, funding classrooms, clean energy, and space literacy.
          </p>
          <p className="text-xs text-muted-foreground">{DOMAIN}</p>
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-foreground text-background">
              <XMark className="size-3.5" />
            </span>
            @{X_HANDLE}
          </a>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Visit</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/story" className="hover:text-accent">
                The life
              </Link>
            </li>
            <li>
              <Link to="/vision" className="hover:text-accent">
                Mars & tech
              </Link>
            </li>
            <li>
              <Link to="/america" className="hover:text-accent">
                America
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-accent">
                Donate crypto
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Donate</p>
          <p className="mt-3 text-sm leading-normal text-muted-foreground">
            BTC, ETH, BNB, SOL, DOGE, USDT, USDC, and USDG.
          </p>
        </div>
      </div>
    </footer>
  );
}
