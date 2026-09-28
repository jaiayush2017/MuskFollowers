import type { CauseId } from "@/lib/wallets";

export const BASELINE = {
  students: 18_400,
  watts: 4_200,
  lessons: 62_800,
  usd: 842_500,
};

export type Gift = {
  id: string;
  usd: number;
  cause: CauseId;
  coin: string;
  at: number;
};

export function tallyImpact(gifts: Gift[]) {
  let students = BASELINE.students;
  let watts = BASELINE.watts;
  let lessons = BASELINE.lessons;
  let usd = BASELINE.usd;

  for (const gift of gifts) {
    usd += gift.usd;
    if (gift.cause === "stem") students += Math.round(gift.usd / 25);
    if (gift.cause === "energy") watts += Math.round(gift.usd / 10);
    if (gift.cause === "space") lessons += Math.round(gift.usd / 5);
  }

  return { students, watts, lessons, usd };
}

export function giftFootprint(usd: number, cause: CauseId) {
  return {
    students: cause === "stem" ? Math.round(usd / 25) : 0,
    watts: cause === "energy" ? Math.round(usd / 10) : 0,
    lessons: cause === "space" ? Math.round(usd / 5) : 0,
  };
}
