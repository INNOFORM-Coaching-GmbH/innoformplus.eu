import Link from 'next/link';
import { Check, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Etappe } from '@/data/courses';
import s from './Learning.module.css';

export function LearningProgress({ prozent, label = 'abgeschlossen', klein }: { prozent: number; label?: string; klein?: boolean }) {
  const p = Math.max(0, Math.min(100, Math.round(prozent)));
  return (
    <div className={`${s.progress} ${klein ? s.klein : ''}`}>
      <p className={s.progressText}>
        <strong>{p} %</strong> {label}
      </p>
      <div className={s.bar} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={p} aria-label={`Lernfortschritt: ${p} % ${label}`}>
        <span style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}

export type Zustand = 'fertig' | 'aktuell' | 'offen' | 'gesperrt';

/** Kursnavigation links in der Lernansicht: Etappen (Module) mit Stationen (Lessons) und Zustand. */
export function ModuleNavigation({ etappen, zustand, href, aktuell }: {
  etappen: Etappe[];
  zustand: (nr: number) => Zustand;
  href: (nr: number) => string;
  aktuell: number;
}) {
  return (
    <nav aria-label="Kursinhalt" className={s.modnav}>
      <ol className={s.module}>
        {etappen.map((e, i) => {
          const fertig = e.stationen.filter((st) => zustand(st.nr) === 'fertig').length;
          return (
            <li key={e.titel} className={s.modul}>
              <p className={s.modulKopf}>
                <span className={s.modulNr}>Etappe {i + 1}</span>
                <span className={s.modulTitel}>{e.titel}</span>
                <span className={s.modulStand}>{fertig}/{e.stationen.length}</span>
              </p>
              <ol className={s.lessons}>
                {e.stationen.map((st) => {
                  const z = zustand(st.nr);
                  const inhalt = (
                    <>
                      <span className={`${s.marker} ${s[z]}`} aria-hidden>
                        {z === 'fertig' && <Check size={14} strokeWidth={3} />}
                        {z === 'gesperrt' && <Lock size={12} strokeWidth={2} />}
                      </span>
                      <span className={s.lessonTitel}>
                        {st.titel}
                        <span className="visually-hidden">
                          {z === 'fertig' ? ' (abgeschlossen)' : z === 'aktuell' ? ' (aktuelle Station)' : z === 'gesperrt' ? ' (gesperrt)' : ''}
                        </span>
                      </span>
                      <span className={s.lessonDauer}>{st.minuten} min</span>
                    </>
                  );
                  return (
                    <li key={st.nr}>
                      {z === 'gesperrt' ? (
                        <span className={`${s.lesson} ${s.lessonGesperrt}`}>{inhalt}</span>
                      ) : (
                        <Link href={href(st.nr)} className={s.lesson} aria-current={st.nr === aktuell ? 'step' : undefined}>
                          {inhalt}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function LessonNavigation({ zurueck, weiter }: { zurueck?: { href: string; titel: string }; weiter?: { href: string; titel: string } }) {
  return (
    <nav aria-label="Stationen blättern" className={s.lessonNav}>
      {zurueck ? (
        <Link href={zurueck.href} className={s.blaettern}>
          <ArrowLeft size={20} strokeWidth={1.75} aria-hidden />
          <span>
            <span className={s.blaetternLabel}>Zurück</span>
            <span className={s.blaetternTitel}>{zurueck.titel}</span>
          </span>
        </Link>
      ) : <span />}
      {weiter && (
        <Link href={weiter.href} className={`${s.blaettern} ${s.weiter}`}>
          <span>
            <span className={s.blaetternLabel}>Weiter</span>
            <span className={s.blaetternTitel}>{weiter.titel}</span>
          </span>
          <ArrowRight size={20} strokeWidth={1.75} aria-hidden />
        </Link>
      )}
    </nav>
  );
}
