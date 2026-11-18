import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { ModuleNavigation, LessonNavigation, LearningProgress, type Zustand } from '@/components/Learning';
import { KnowledgeCheck } from '@/components/KnowledgeCheck';
import { PlaceholderNote } from '@/components/Section';
import { courses, getCourse, stationen } from '@/data/courses';
import { demoFortschritt, demoFrage } from '@/data/demo';
import { seite } from '@/lib/seo';
import s from '../../lernen.module.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return courses.flatMap((c) => stationen(c).map((st) => ({ course: c.slug, lesson: String(st.nr) })));
}

type P = { params: Promise<{ course: string; lesson: string }> };

export async function generateMetadata({ params }: P) {
  const { course, lesson } = await params;
  const c = getCourse(course);
  const st = c && stationen(c).find((x) => x.nr === Number(lesson));
  if (!c || !st) return {};
  return seite({ titel: `${st.titel} – ${c.titel}`, beschreibung: `Lernstation ${st.nr} im Kurs ${c.titel}.`, pfad: `/lernen/${c.slug}/${st.nr}/`, privat: true });
}

export default async function Lernansicht({ params }: P) {
  const { course, lesson } = await params;
  const c = getCourse(course);
  if (!c) notFound();
  const alle = stationen(c);
  const i = alle.findIndex((x) => x.nr === Number(lesson));
  if (i < 0) notFound();
  const st = alle[i];
  const etappeIndex = c.etappen.findIndex((e) => e.stationen.includes(st));
  const fertig = demoFortschritt.kurs === c.slug ? demoFortschritt.fertigBis : 0;
  const zustand = (nr: number): Zustand => (nr === st.nr ? 'aktuell' : nr <= fertig ? 'fertig' : 'offen');
  const href = (nr: number) => `/lernen/${c.slug}/${nr}/`;
  const prozent = (fertig / alle.length) * 100;

  return (
    <div className={s.workspace}>
      <aside className={s.seite} aria-label="Kursübersicht">
        <div className={s.seiteKopf}>
          <Link href={`/kurse/${c.slug}/`} className={s.kursLink}>{c.titel}</Link>
          <LearningProgress prozent={prozent} />
        </div>
        <details className={s.navDetails}>
          <summary className={s.navSummary}>Kursinhalt anzeigen</summary>
          <ModuleNavigation etappen={c.etappen} zustand={zustand} href={href} aktuell={st.nr} />
        </details>
        <div className={s.navDesktop}>
          <ModuleNavigation etappen={c.etappen} zustand={zustand} href={href} aktuell={st.nr} />
        </div>
      </aside>

      <article className={s.inhalt}>
        <p className="eyebrow">Etappe {etappeIndex + 1} · {c.etappen[etappeIndex].titel} · Station {i + 1} von {alle.length}</p>
        <h1 className={s.titel}>{st.titel}</h1>
        <p className="small muted">{st.minuten} min · Video</p>

        <div className={s.video} role="img" aria-label="Platzhalter für das Video dieser Station">
          <PlayCircle size={56} strokeWidth={1.25} aria-hidden />
          <span>Video folgt</span>
        </div>

        <section aria-labelledby="kernaussagen" className={s.block}>
          <h2 id="kernaussagen" className={s.blockTitel}>Kernaussagen</h2>
          <p className="muted">Die Kernaussagen dieser Station werden aus E2G übernommen.</p>
          <PlaceholderNote />
        </section>

        <KnowledgeCheck frage={demoFrage} />
        <p className="small muted"><PlaceholderNote>Beispielfrage</PlaceholderNote> Die Frage stammt aus der Gestaltungsvorgabe und gehört nicht zu dieser Station.</p>

        <LessonNavigation
          zurueck={i > 0 ? { href: href(alle[i - 1].nr), titel: alle[i - 1].titel } : undefined}
          weiter={i < alle.length - 1 ? { href: href(alle[i + 1].nr), titel: alle[i + 1].titel } : undefined}
        />
      </article>
    </div>
  );
}
