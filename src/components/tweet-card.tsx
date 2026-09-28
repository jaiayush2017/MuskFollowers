type Poll = {
  yes: number;
  no: number;
  votes: string;
};

type TweetCardProps = {
  date: string;
  text: string;
  href: string;
  likes: string;
  views: string;
  poll?: Poll;
};

export function TweetCard({ date, text, href, likes, views, poll }: TweetCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <header className="flex items-center gap-3">
        <img
          src="/images/elon-avatar.jpg"
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-none">Elon Musk</p>
          <p className="mt-1 text-xs text-muted-foreground">@elonmusk · {date}</p>
        </div>
      </header>
      <p className="mt-4 whitespace-pre-line text-base leading-normal">{text}</p>
      {poll ? (
        <div className="mt-4 space-y-2">
          <PollRow label="Yes" value={poll.yes} lead />
          <PollRow label="No" value={poll.no} />
          <p className="pt-1 text-xs text-muted-foreground">{poll.votes} votes on X</p>
        </div>
      ) : null}
      <footer className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span>{likes} likes</span>
        <span>{views} views</span>
        <a className="text-primary hover:underline" href={href} rel="noreferrer" target="_blank">
          View post on X
        </a>
      </footer>
    </article>
  );
}

function PollRow({ label, value, lead = false }: { label: string; value: number; lead?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className={lead ? "font-semibold" : ""}>{label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={lead ? "h-full rounded-full bg-primary" : "h-full rounded-full bg-muted-foreground/50"}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
