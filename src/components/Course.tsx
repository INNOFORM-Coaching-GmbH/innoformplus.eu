import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/data/courses';
import { dauerMinuten, dauerText, stationenAnzahl } from '@/data/courses';
import { themen } from '@/data/site';
import s from './Course.module.css';

export function CategoryBadge({ children, ton = 'neutral' }: { children: string; ton?: 'neutral' | 'akzent' | 'platzhalter' }) {
  return <span className={`${s.badge} ${s[ton]}`}>{children}</span>;
}

export const themaLabel = (slug: string) => themen.find((t) => t.slug === slug)?.label ?? slug;

/** Kurskarte ohne Bild: Metadaten, Titel, Kurzbeschreibung, Schlagworte. Die ganze Karte ist ein Link. */
export function CourseCard({ course, ebene = 'h3' }: { course: Course; ebene?: 'h2' | 'h3' }) {
  const Titel = ebene;
  const n = stationenAnzahl(course);
  const d = dauerText(dauerMinuten(course));
  return (
    <article className={s.card}>
      <div className={s.oben}>
        <div className={s.badges}>
          <CategoryBadge>{themaLabel(course.thema)}</CategoryBadge>
          {course.badge && <CategoryBadge ton="akzent">{course.badge}</CategoryBadge>}
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
