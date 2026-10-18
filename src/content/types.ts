/** Shapes for everything in cv.ts. Components read only these types. */

/** A string that is shown as a visible TODO on the site instead of invented copy. */
export type Todo = { todo: string };
export type Text = string | Todo;

export const isTodo = (t: unknown): t is Todo =>
  typeof t === "object" && t !== null && "todo" in t;

export type Kpi = {
  /** Number the counter animates to. */
  value: number;
  /** Text before and after the number, e.g. "~" and "%". */
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

export type Emblem = "gear" | "discs" | "screens" | "bars" | "vault" | "globe";

export type Station = {
  n: string;
  short: string;
  title: string;
  role: string;
  dates: string;
  place: string;
  emblem: Emblem;
  /** Marks the two bigger career jumps. */
  jump?: string;
  metric: { value: string; label: string };
  points: string[];
  chips: string[];
  /** Section id the panel links to for proof. */
  proof?: { label: string; href: string };
};

export type MethodStep = {
  k: string;
  title: string;
  summary: string;
  example: string;
  body: string;
  source: string;
};

export type ProjectArea = "quant" | "valuation" | "derivatives" | "wealth" | "macro";

export type Project = {
  n: string;
  /** Folder in github.com/miabeckercooper/finance-portfolio */
  dir: string;
  title: string;
  area: ProjectArea;
  course: string;
  date: string;
  summary: string;
  hero: { value: string; label: string };
  figures: { value: string; label: string }[];
  /** Team as listed in FACTS.md. */
  team: Text;
  /** Mia's role, only where FACTS.md states it. */
  role: Text;
  /** Screenshot base names in source/screenshots (without extension). */
  shots: string[];
  simulated?: boolean;
  note?: string;
};

export type BacktestVariant = {
  id: "A" | "B" | "C" | "D";
  sizing: "neutral" | "130/30";
  overlay: boolean;
  name: string;
  sharpe: number;
  dsr: number;
  maxDd: number;
  pitched?: boolean;
  verdict: string;
};
