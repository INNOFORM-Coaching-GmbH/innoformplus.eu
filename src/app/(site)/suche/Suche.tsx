'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search } from '@/components/Feedback';
import { EmptyState } from '@/components/States';
import { courses } from '@/data/courses';
import { mainNav } from '@/data/site';
import s from './suche.module.css';

const normal = (t: string) => t.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

type Eintrag = { titel: string; text: string; href: string; art: string };

const index: Eintrag[] = [
  ...courses.map((c) => ({ titel: c.titel, text: c.kurzbeschreibung, href: `/kurse/${c.slug}/`, art: 'Kurs' })),
  ...courses.flatMap((c) => c.etappen.flatMap((e) => e.stationen.map((st) => ({ titel: st.titel, text: `Station im Kurs ${c.titel} · Etappe ${e.titel}`, href: `/kurse/${c.slug}/#struktur`, art: 'Lernstation' })))),
  ...mainNav.map((n) => ({ titel: n.label, text: 'Seite', href: n.href, art: 'Seite' })),
];

export function Suche() {
  const params = useSearchParams();
  const [q, setQ] = useState('');
  useEffect(() => setQ(params.get('q') ?? ''), [params]);
  const treffer = useMemo(() => {
    const n = normal(q.trim());
    if (n.length < 2) return [];
    return index.filter((e) => normal(`${e.titel} ${e.text}`).includes(n)).slice(0, 30);
  }, [q]);

  return (
    <div className={s.suche}>
      <Search id="globale-suche" label="Innoform Plus durchsuchen" wert={q} onChange={setQ} platzhalter="Suchbegriff, z. B. Siegeln oder Gleitmittel" />
      {q.trim().length >= 2 && (
        <p className={s.anzahl} role="status">{treffer.length} {treffer.length === 1 ? 'Treffer' : 'Treffer'} für „{q.trim()}“</p>
      )}
      {q.trim().length >= 2 && !treffer.length && (
        <EmptyState titel="Keine Treffer." text="Versuchen Sie einen anderen Begriff oder sehen Sie sich alle Kurse an." aktion={<Link href="/kurse/">Alle Kurse anzeigen</Link>} />
      )}
      {treffer.length > 0 && (
        <ul className={s.liste}>
          {treffer.map((t, i) => (
            <li key={`${t.href}-${i}`}>
              <span className={s.art}>{t.art}</span>
              <Link href={t.href} className={s.titel}>{t.titel}</Link>
              <span className={s.text}>{t.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
