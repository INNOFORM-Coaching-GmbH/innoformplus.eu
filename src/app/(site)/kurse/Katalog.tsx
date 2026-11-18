'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CourseGrid } from '@/components/Course';
import { Search } from '@/components/Feedback';
import { EmptyState, Pagination } from '@/components/States';
import { Button } from '@/components/Button';
import { courses } from '@/data/courses';
import { themen } from '@/data/site';
import s from './kurse.module.css';

const PRO_SEITE = 9;

const normal = (t: string) => t.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function Katalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pfad = usePathname();
  const [q, setQ] = useState(params.get('q') ?? '');
  const thema = params.get('thema') ?? '';
  const seite = Math.max(1, Number(params.get('seite') ?? 1));

  useEffect(() => setQ(params.get('q') ?? ''), [params]);

  const setze = (werte: Record<string, string>) => {
    const p = new URLSearchParams(params.toString());
    Object.entries(werte).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    p.delete('seite');
    router.replace(`${pfad}${p.toString() ? `?${p}` : ''}`, { scroll: false });
  };

  const treffer = useMemo(() => {
    const n = normal(q.trim());
    return courses.filter(
      (c) =>
        (!thema || c.thema === thema) &&
        (!n || normal([c.titel, c.kurzbeschreibung, ...c.schlagworte].join(' ')).includes(n)),
    );
  }, [q, thema]);

  const seiten = Math.max(1, Math.ceil(treffer.length / PRO_SEITE));
  const sichtbar = treffer.slice((seite - 1) * PRO_SEITE, seite * PRO_SEITE);

  return (
    <div className={s.katalog}>
      <div className={s.filter}>
        <Search id="kurssuche" label="Kurse durchsuchen" wert={q} onChange={(v) => { setQ(v); setze({ q: v }); }} />
        <fieldset className={s.themen}>
          <legend className="visually-hidden">Nach Thema filtern</legend>
          <button type="button" className={s.chip} aria-pressed={!thema} onClick={() => setze({ thema: '' })}>Alle Themen</button>
          {themen.map((t) => (
            <button key={t.slug} type="button" className={s.chip} aria-pressed={thema === t.slug} onClick={() => setze({ thema: thema === t.slug ? '' : t.slug })}>
              {t.label}
            </button>
          ))}
        </fieldset>
      </div>
      <p className={s.anzahl} role="status">
        {treffer.length} {treffer.length === 1 ? 'Kurs' : 'Kurse'}
      </p>
      {sichtbar.length ? (
        <>
          <CourseGrid courses={sichtbar} ebene="h2" />
          {seiten > 1 && (
            <div className={s.pagination}>
              <Pagination seite={seite} seiten={seiten} href={(n) => { const p = new URLSearchParams(params.toString()); p.set('seite', String(n)); return `${pfad}?${p}`; }} />
            </div>
          )}
        </>
      ) : (
        <EmptyState
          titel="Keine passenden Kurse gefunden."
          text="Zu diesem Thema oder Suchbegriff gibt es noch keinen Kurs. Weitere Kurse sind in Vorbereitung."
          aktion={<Button variant="secondary" onClick={() => { setQ(''); router.replace(pfad, { scroll: false }); }}>Filter zurücksetzen</Button>}
        />
      )}
    </div>
  );
}
