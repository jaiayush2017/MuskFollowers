import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/vision")({ component: VisionPage });

function VisionPage() {
  return (
    <main>
      <section className="relative min-h-[50vh] overflow-hidden border-b border-border">
        <img
          src="/images/mars.jpg"
          alt="A rust-colored Mars landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-space/30" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-space">Mars and tech</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Make life multiplanetary. Keep this one livable.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <article>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-space">The species bet</h2>
            <p className="mt-4 text-sm leading-normal text-muted-foreground">
              Musk has said for two decades that consciousness should not sit on a single planet.
              SpaceX exists to drive launch costs down until a city on Mars is not a movie. In 2016
              he sketched that architecture at the International Astronautical Congress. In 2026 he
              still talks Mars, while naming a self-growing lunar city as the faster civilizational
              insurance policy.
            </p>
            <p className="mt-4 text-sm leading-normal text-muted-foreground">
              Falcon 9's landings made reuse ordinary. Starship is the vehicle sized for people
              and cargo, not postcards. That is why a booster slamming onto a drone ship belongs on
              this page: it is the proof that the next step is engineering, not wish.
            </p>
          </article>
          <article>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-energy">The Earth bet</h2>
            <p className="mt-4 text-sm leading-normal text-muted-foreground">
              The same man called the carbon experiment the most dangerous in history. Tesla, Solar
              City, and grid batteries are the industrial answer: stop burning the attic while you
              figure out the other planet. Passion for technology here is not gadget love. It is
              first-principles work on cars, tunnels, robots, and models of the world.
            </p>
            <p className="mt-4 text-sm leading-normal text-muted-foreground">
              MuskFollowers funds classrooms and kits that teach that stack — code, energy, orbit —
              without pretending we fly the rockets.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <img src="/images/landing.jpg" alt="A booster landing at sea" className="h-80 w-full object-cover" />
          <img src="/images/energy.jpg" alt="Solar arrays and electric vehicles" className="h-80 w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Button asChild>
          <Link to="/donate">
            Donate crypto
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </main>
  );
}
