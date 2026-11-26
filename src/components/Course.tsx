import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/data/courses';
import { dauerMinuten, dauerText, stationenAnzahl } from '@/data/courses';
import { themen } from '@/data/site';
import s from './Course.module.css';

export function CategoryBadge({ children, ton = 'neutral' }: { children: string; ton?: 'neutral' | 'akzent' | 'platzhalter' }) {
  return <span className={`${s.badge} ${s[ton]}`}>{children}</span>;
}

/** Themen-Grafik der Kurskarte wie im Plattform-Prototyp: Linienzeichen auf heller Themenfarbe. Dekorativ. */
const ART: Record<string, { ton: 'blau' | 'magenta' | 'gruen'; pfad: string }> = {
  abpacken: { ton: 'blau', pfad: 'M12 35h56m24 0h56M66 21h28v28H66Z' },
  beutel: { ton: 'blau', pfad: 'M12 35h56m24 0h56M66 21h28v28H66Z' },
  folien: { ton: 'magenta', pfad: 'M18 19h124M18 35h124M18 51h124' },
  verbunde: { ton: 'magenta', pfad: 'M18 19h124M18 35h124M18 51h124' },
  papier: { ton: 'magenta', pfad: 'M18 19h124M18 35h124M18 51h124' },
  recycling: { ton: 'gruen', pfad: 'M12 35h60l35-20h41M72 35l35 20h41' },
  nachhaltigkeit: { ton: 'gruen', pfad: 'M12 35h60l35-20h41M72 35l35 20h41' },
};
export function CourseArt({ thema }: { thema: string }) {
  const a = ART[thema] ?? ART.abpacken;
  return (
    <div className={`${s.art} ${s[a.ton]}`} aria-hidden>
      <svg viewBox="0 0 160 70"><path d={a.pfad} fill="none" stroke="currentColor" strokeWidth="4" /></svg>
    </div>
  );
}

export const themaLabel = (slug: string) => themen.find((t) => t.slug === slug)?.label ?? slug;

/** Kurskarte ohne Bild: Metadaten, Titel, Kurzbeschreibung, Schlagworte. Die ganze Karte ist ein Link. */
export function CourseCard({ course, ebene = 'h3' }: { course: Course; ebene?: 'h2' | 'h3' }) {
  const Titel = ebene;
  const n = stationenAnzahl(course);
  const d = dauerText(dauerMinuten(course));
  return (
    <article className={s.card}>
      <CourseArt thema={course.thema} />
      <div className={s.koerper}>
      <div className={s.oben}>
        <div className={s.badges}>
          <CategoryBadge>{themaLabel(course.thema)}</CategoryBadge>
          {course.badge && <CategoryBadge ton="akzent">{course.badge}</CategoryBadge>}
          {course.status === 'in-produktion' && <CategoryBadge ton="platzhalter">In Produktion</CategoryBadge>}
          {course.platzhalter && <CategoryBadge ton="platzhalter">Platzhalter</CategoryBadge>}
        </div>
        <dl className={s.meta}>
          {n !== undefined && (
            <div><dt className="visually-hidden">Stationen</dt><dd>{n} Stationen</dd></div>
          )}
          {d && (
            <div><dt className="visually-hidden">Dauer</dt><dd>{d}</dd></div>
          )}
        </dl>
      </div>
      <Titel className={s.titel}>
        <Link href={`/kurse/${course.slug}/`} className={s.link}>
          {course.titel}
        </Link>
      </Titel>
      <p className={s.text}>{course.kurzbeschreibung}</p>
      <div className={s.unten}>
        <p className={s.tags}>{course.schlagworte.join(' | ')}</p>
        <ArrowRight className={s.pfeil} size={22} strokeWidth={1.75} aria-hidden />
      </div>
      </div>
    </article>
  );
}

export function CourseGrid({ courses, ebene }: { courses: Course[]; ebene?: 'h2' | 'h3' }) {
  return (
    <ul className={s.grid}>
      {courses.map((c) => (
        <li key={c.slug}>
          <CourseCard course={c} ebene={ebene} />
        </li>
      ))}
    </ul>
  );
}
