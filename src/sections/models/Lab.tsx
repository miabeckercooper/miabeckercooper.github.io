import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { clearPendingModel, EVENT, peekPendingModel } from "../../lib/modelStore";
import { models } from "../../content/cv";
import { BacktestLab } from "./BacktestLab";
import { DcfGrid } from "./DcfGrid";
import { GbmPaths } from "./GbmPaths";
import { MonteCarlo } from "./MonteCarlo";

const PANELS = { backtest: BacktestLab, dcf: DcfGrid, mc: MonteCarlo, gbm: GbmPaths } as const;
type Id = keyof typeof PANELS;

export default function Lab() {
  const [tab, setTab] = useState<Id>(() => (peekPendingModel() as Id | null) ?? "backtest");
  useEffect(() => {
    clearPendingModel();
    const on = (e: Event) => { const id = (e as CustomEvent<string>).detail as Id; if (id in PANELS) { clearPendingModel(); setTab(id); } };
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const ids = models.tabs.map((t) => t.id as Id);
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const j = (i + d + ids.length) % ids.length;
    setTab(ids[j]);
    refs.current[j]?.focus();
  };
  const Panel = PANELS[tab];
  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Live models">
        {models.tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className="tab"
            onClick={() => setTab(t.id as Id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.name}
            <small>{t.source}</small>
          </button>
        ))}
      </div>
      <div className="lab" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        <Panel />
      </div>
    </div>
  );
}
