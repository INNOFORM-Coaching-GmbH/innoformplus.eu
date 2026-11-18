'use client';

import { useId, useRef, useState, type ReactNode, type KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import s from './Disclosure.module.css';

/** Akkordeon auf Basis von <details>: ohne JavaScript bedienbar, Tastatur und Screenreader inklusive. */
export function Accordion({ items, ebene = 'h3' }: { items: { frage: string; antwort: ReactNode }[]; ebene?: 'h2' | 'h3' }) {
  const Titel = ebene;
  return (
    <div className={s.accordion}>
      {items.map((it) => (
        <details key={it.frage} className={s.item}>
          <summary className={s.summary}>
            <Titel className={s.frage}>{it.frage}</Titel>
            <ChevronDown className={s.chevron} size={22} strokeWidth={1.75} aria-hidden />
          </summary>
          <div className={s.antwort}>{it.antwort}</div>
        </details>
      ))}
    </div>
  );
}

/** Reiter nach WAI-ARIA (Pfeiltasten, Pos1/Ende). */
export function Tabs({ tabs, label }: { tabs: { id: string; label: string; inhalt: ReactNode }[]; label: string }) {
  const [aktiv, setAktiv] = useState(0);
  const basis = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const gehe = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setAktiv(n);
    refs.current[n]?.focus();
  };
  const taste = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') gehe(aktiv + 1);
    else if (e.key === 'ArrowLeft') gehe(aktiv - 1);
    else if (e.key === 'Home') gehe(0);
    else if (e.key === 'End') gehe(tabs.length - 1);
    else return;
    e.preventDefault();
  };
  return (
    <div>
      <div role="tablist" aria-label={label} className={s.tablist} onKeyDown={taste}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            type="button"
            id={`${basis}-tab-${t.id}`}
            aria-selected={aktiv === i}
            aria-controls={`${basis}-panel-${t.id}`}
            tabIndex={aktiv === i ? 0 : -1}
            className={s.tab}
            onClick={() => setAktiv(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${basis}-panel-${t.id}`}
          aria-labelledby={`${basis}-tab-${t.id}`}
          hidden={aktiv !== i}
          tabIndex={0}
          className={s.panel}
        >
          {t.inhalt}
        </div>
      ))}
    </div>
  );
}
