import { createFileRoute } from "@tanstack/react-router";
import { TweetCard } from "@/components/tweet-card";
import { POSTS } from "@/lib/content";

export const Route = createFileRoute("/america")({ component: AmericaPage });

function AmericaPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-wider text-america">America</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Musk-caliber leadership for the country.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-normal text-muted-foreground">
          A supporter community, not a campaign. We want America run with the same seriousness as
          a launch window.
        </p>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">The law</h2>
          <p className="mt-4 max-w-3xl text-sm leading-normal text-muted-foreground">
            The presidency requires a natural-born citizen. Musk was born in Pretoria in 1971 and
            naturalized in 2002, so he cannot hold that office unless the Constitution is amended.
            He can still speak, fund, and seek other offices. We print that so this site never
            pretends otherwise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight">From his account</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          On 4 July 2025 he polled X on a new party. About 1.25 million votes came in, 65.4% yes.
          The next day he wrote that the America Party was formed. Posts below use his words,
          dates, and public counts; tap through to X for the originals.
        </p>
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {POSTS.map((post) => (
            <li key={post.id}>
              <TweetCard
                date={post.date}
                text={post.text}
                href={`https://x.com/elonmusk/status/${post.id}`}
                likes={post.likes}
                views={post.views}
                poll={"poll" in post ? post.poll : undefined}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Polls</h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                His X poll, July 2025
              </dt>
              <dd className="mt-2 font-display text-2xl font-semibold text-primary">65.4%</dd>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes, among ~1.25 million votes on the America Party question.
              </p>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Quantus Insights
              </dt>
              <dd className="mt-2 font-display text-2xl font-semibold text-america">~40%</dd>
              <p className="mt-2 text-sm text-muted-foreground">
                Very or somewhat likely to back a Musk third party (late June 2025).
              </p>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
