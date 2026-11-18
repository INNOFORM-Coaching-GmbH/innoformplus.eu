import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Info, Loader2, SearchX } from 'lucide-react';
import s from './Feedback.module.css';

// Zustände und Seitennavigation ohne Client-JavaScript (auch in Server-Komponenten nutzbar).

export function Pagination({ seite, seiten, href }: { seite: number; seiten: number; href: (n: number) => string }) {
  if (seiten < 1) return null;
  return (
    <nav className={s.pagination} aria-label="Seitennavigation">
      <ul>
        <li>
          {seite > 1 ? (
            <Link href={href(seite - 1)} className={s.seite} aria-label="Vorherige Seite"><ChevronLeft size={20} aria-hidden /></Link>
          ) : (
            <span className={`${s.seite} ${s.aus}`} aria-hidden><ChevronLeft size={20} /></span>
          )}
        </li>
        {Array.from({ length: seiten }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link href={href(n)} className={s.seite} aria-current={n === seite ? 'page' : undefined} aria-label={`Seite ${n}`}>
              {n}
            </Link>
          </li>
        ))}
        <li>
          {seite < seiten ? (
            <Link href={href(seite + 1)} className={s.seite} aria-label="Nächste Seite"><ChevronRight size={20} aria-hidden /></Link>
          ) : (
            <span className={`${s.seite} ${s.aus}`} aria-hidden><ChevronRight size={20} /></span>
          )}
        </li>
      </ul>
    </nav>
  );
}


export function EmptyState({ titel, text, aktion, icon = 'suche' }: { titel: string; text?: ReactNode; aktion?: ReactNode; icon?: 'suche' | 'info' }) {
  const Icon = icon === 'suche' ? SearchX : Info;
  return (
    <div className={s.zustand}>
      <Icon size={32} strokeWidth={1.5} aria-hidden />
      <h2 className="h3">{titel}</h2>
      {text && <p className="muted">{text}</p>}
      {aktion}
    </div>
  );
}


export function LoadingState({ text = 'Wird geladen …' }: { text?: string }) {
  return (
    <div className={s.laden} role="status">
      <Loader2 className={s.spin} size={24} strokeWidth={2} aria-hidden />
      <span>{text}</span>
    </div>
  );
}


export function Skeleton({ zeilen = 3, hoehe }: { zeilen?: number; hoehe?: number }) {
  return (
    <div className={s.skeleton} aria-hidden>
      {hoehe ? <span style={{ height: hoehe }} /> : Array.from({ length: zeilen }, (_, i) => <span key={i} style={{ width: `${100 - i * 15}%` }} />)}
    </div>
  );
}
