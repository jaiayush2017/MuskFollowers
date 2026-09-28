import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIMELINE } from "@/lib/content";

export const Route = createFileRoute("/story")({ component: StoryPage });

function StoryPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-wider text-stem">The life</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          From a Pretoria bedroom to a pad that aims at Mars.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-normal text-muted-foreground">
          Public biography, not an authorized memoir.
        </p>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <img
            src="/images/childhood.jpg"
            alt="A 1980s home computer and encyclopedias"
            className="h-full min-h-80 w-full object-cover"
          />
          <div className="flex flex-col justify-center px-4 py-12 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wider text-stem">1971–1988</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              He read the library.
            </h2>
            <p className="mt-4 text-base leading-normal text-muted-foreground">
              Maye Musk has said he read everything. School was brutal; he has described being
              thrown down stairs. At twelve he coded Blastar and sold it. At seventeen he left
              apartheid-era conscription behind for Canada, then the United States.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="space-y-10">
          {TIMELINE.map((item) => (
            <li key={item.year} className="grid gap-2 sm:grid-cols-[6rem_1fr] sm:gap-8">
              <p className="font-display text-sm font-medium text-stem">{item.year}</p>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-2 text-sm leading-normal text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <Button asChild className="mt-12">
          <Link to="/vision">
            The Mars bet
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </main>
  );
}
