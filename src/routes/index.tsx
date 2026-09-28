import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { ImpactStats } from "@/components/impact-stats";
import { Button } from "@/components/ui/button";
import { CIVIC_HOPE, COMMUNITY, QUOTES, TAGLINE } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="relative min-h-[85vh] overflow-hidden border-b border-border">
        <img
          src="/images/hero.jpg"
          alt="A stainless steel heavy-lift rocket on a coastal pad at dusk"
          width={2560}
          height={1440}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-stem/20" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">{COMMUNITY}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            {TAGLINE}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-xl">
            From every time zone, we fund classrooms, clean energy, and a multiplanetary future — in
            Elon Musk's spirit and vision, never claiming his name.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {CIVIC_HOPE}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/donate">
                Donate crypto
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/vision">Our vision</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <ImpactStats />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[auto_1fr] md:py-24">
        <img
          src="/images/elon-musk.jpg"
          alt="Portrait of Elon Musk, Royal Society, 2018"
          width={240}
          height={320}
          decoding="async"
          className="h-64 w-48 rounded-lg object-cover object-top ring-1 ring-border"
        />
        <blockquote>
          <p className="font-display text-2xl font-medium italic leading-snug tracking-tight sm:text-4xl">
            &ldquo;{QUOTES[0].text}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">
            Elon Musk · {QUOTES[0].source}. Photo: Debbie Rowe / Royal Society, CC BY-SA 3.0.
          </footer>
        </blockquote>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {QUOTES.slice(1).map((quote) => (
            <blockquote
              key={quote.source}
              className="border-b border-border p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8"
            >
              <p className="font-display text-lg font-medium italic leading-snug">&ldquo;{quote.text}&rdquo;</p>
              <footer className="mt-4 text-xs text-muted-foreground">{quote.source}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">The work</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Charity in his spirit.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              to: "/story" as const,
              img: "/images/childhood.jpg",
              alt: "1980s computer and encyclopedias on a desk",
              kicker: "From Pretoria",
              tone: "text-stem",
              title: "The life",
              body: "A reader, a sold game, three failed rockets, then orbit.",
            },
            {
              to: "/vision" as const,
              img: "/images/mars.jpg",
              alt: "Mars dunes under a dark sky",
              kicker: "The bet",
              tone: "text-space",
              title: "Mars and machines",
              body: "Electric cars, reusable flight, a city off Earth.",
            },
            {
              to: "/america" as const,
              img: "/images/landing.jpg",
              alt: "A rocket booster landing at sea",
              kicker: "The republic",
              tone: "text-america",
              title: "America",
              body: "The 2025 poll, the posts, and what the law allows.",
            },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group overflow-hidden rounded-xl border border-border bg-background"
            >
              <img
                src={card.img}
                alt={card.alt}
                decoding="async"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-5">
                <p className={cn("text-xs font-medium uppercase tracking-wider", card.tone)}>{card.kicker}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Disclaimer />
        </div>
      </section>
    </main>
  );
}
