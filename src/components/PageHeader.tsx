import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import s from './PageHeader.module.css';

export type Krume = { name: string; pfad: string };

export function Breadcrumb({ krumen }: { krumen: Krume[] }) {
  return (
    <nav aria-label="Brotkrumen" className={s.bc}>
      <ol>
        {krumen.map((k, i) => (
          <li key={k.pfad}>
            {i < krumen.length - 1 ? (
              <>
                <Link href={k.pfad}>{k.name}</Link>
                <ChevronRight size={14} strokeWidth={2} aria-hidden />
              </>
            ) : (
              <span aria-current="page">{k.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Kopf für Unterseiten: Brotkrumen, Eyebrow, H1, Einleitung, optional Aktionen/Meta rechts. */
export function PageHeader({ krumen, eyebrow, titel, text, rechts, children }: {
  krumen?: Krume[];
  eyebrow?: ReactNode;
  titel: ReactNode;
  text?: ReactNode;
  rechts?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={s.kopf}>
      <div className={`container ${s.grid}`}>
        <div className={s.links}>
          {krumen && <Breadcrumb krumen={krumen} />}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`h1 ${s.h1}`}>{titel}</h1>
          {text && <p className={`body-lg muted ${s.text}`}>{text}</p>}
          {children}
        </div>
        {rechts && <div className={s.rechts}>{rechts}</div>}
      </div>
    </section>
  );
}
