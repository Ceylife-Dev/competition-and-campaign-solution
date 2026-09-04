export type Frequency = "ANN" | "MY" | "QTR" | "MTH";

export interface Competition {
  id: string;
  name: string;
  code: string;
  frequency: Frequency;
  active: boolean;
  participants: number;
  qualifiers: number;
  startDate: string;
  daysLeft: number | null;
}

export const FREQUENCY_META: Record<
  Frequency,
  { short: string; label: string; badge: string }
> = {
  ANN: { short: "ANN", label: "Annual", badge: "bg-blue-50 text-blue-600" },
  MY: { short: "MY", label: "Mid-Year", badge: "bg-purple-50 text-purple-600" },
  QTR: { short: "QTR", label: "Quarterly", badge: "bg-amber-50 text-amber-600" },
  MTH: { short: "MTH", label: "Monthly", badge: "bg-emerald-50 text-emerald-600" },
};

export const FREQUENCY_FILTERS: { key: "ALL" | Frequency; label: string }[] = [
  { key: "ALL", label: "All Freq." },
  { key: "QTR", label: "QTR · Quarterly" },
  { key: "MTH", label: "MTH · Monthly" },
  { key: "ANN", label: "ANN · Annual" },
  { key: "MY", label: "MY · Mid-Year" },
];

/** Dashboard-wide summary figures shown in the stat cards. */
export const SUMMARY_STATS = {
  active: "25",
  participants: "281.4K",
  drafts: "12",
  prizeBudget: "Rs 756,400",
};

/** The low-days-left threshold that turns the countdown red. */
export const DAYS_LEFT_WARNING = 15;

type Template = Omit<Competition, "id">;

const TEMPLATES: Template[] = [
  { name: "National Sales Championship", code: "NSC-2026", frequency: "ANN", active: true, participants: 200, qualifiers: 14200, startDate: "2026-01-01", daysLeft: 90 },
  { name: "Mid-Year Performance Blitz", code: "MYPB-H1", frequency: "MY", active: true, participants: 122, qualifiers: 8700, startDate: "2026-06-01", daysLeft: 12 },
  { name: "Q1 Branch Excellence Award", code: "BEA-Q1", frequency: "QTR", active: false, participants: 89, qualifiers: 3200, startDate: "2026-01-01", daysLeft: 28 },
  { name: "Monthly Top Agent Sprint", code: "TAS-AUG", frequency: "MTH", active: true, participants: 65, qualifiers: 5400, startDate: "2026-08-01", daysLeft: 8 },
  { name: "Annual MCFP Leaders Cup", code: "MLC-ANN", frequency: "ANN", active: true, participants: 145, qualifiers: 11800, startDate: "2026-01-01", daysLeft: 32 },
  { name: "H1 Growth Accelerator", code: "GA-H1", frequency: "MY", active: false, participants: 0, qualifiers: 0, startDate: "2026-07-01", daysLeft: 27 },
  { name: "Q2 District Achievers", code: "DA-Q2", frequency: "QTR", active: false, participants: 54, qualifiers: 2600, startDate: "2026-04-01", daysLeft: 34 },
  { name: "August Agent Rush", code: "AAR-AUG", frequency: "MTH", active: true, participants: 67, qualifiers: 4900, startDate: "2026-08-01", daysLeft: 31 },
  { name: "Grand Annual Trophy Race", code: "GATR-2026", frequency: "ANN", active: true, participants: 300, qualifiers: 21000, startDate: "2026-01-01", daysLeft: 12 },
  { name: "Half-Year Stars Program", code: "HSP-H2", frequency: "MY", active: false, participants: 0, qualifiers: 0, startDate: "2026-07-01", daysLeft: 25 },
];

export const TOTAL_COMPETITIONS = 52;

/** Expand the 10 templates into a believable set of 52 competitions. */
export const competitions: Competition[] = Array.from(
  { length: TOTAL_COMPETITIONS },
  (_, i): Competition => {
    const base = TEMPLATES[i % TEMPLATES.length];
    const cycle = Math.floor(i / TEMPLATES.length);
    return {
      id: `comp-${i + 1}`,
      name: cycle === 0 ? base.name : `${base.name} ${cycle + 1}`,
      code: cycle === 0 ? base.code : `${base.code}-${cycle + 1}`,
      frequency: base.frequency,
      active: base.active,
      participants:
        base.participants === 0 ? 0 : base.participants + cycle * 7,
      qualifiers: base.qualifiers === 0 ? 0 : base.qualifiers + cycle * 350,
      startDate: base.startDate,
      daysLeft:
        base.daysLeft === null ? null : Math.max(1, base.daysLeft - cycle * 4),
    };
  },
);

export function formatCompact(value: number): string {
  if (value >= 1000) {
    const scaled = value / 1000;
    return `${scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1)}K`;
  }
  return String(value);
}
