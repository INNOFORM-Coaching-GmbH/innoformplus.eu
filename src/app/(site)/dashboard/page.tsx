import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeader, PlaceholderNote } from '@/components/Section';
import { Button } from '@/components/Button';
import { LearningProgress } from '@/components/Learning';
import { EmptyState } from '@/components/States';
import { CategoryBadge, themaLabel } from '@/components/Course';
import { courses, getCourse, stationen } from '@/data/courses';
import { demoFortschritt } from '@/data/demo';
import { seite } from '@/lib/seo';
import s from './dashboard.module.css';

export const metadata = seite({ titel: 'Mein Lernbereich', beschreibung: 'Persönliches Learning Dashboard.', pfad: '/dashboard/', privat: true });

export default function Dashboard() {
  const kurs = getCourse(demoFortschritt.kurs)!;
  const alle = stationen(kurs);
  const naechste = alle[demoFortschritt.fertigBis];
  const prozent = (demoFortschritt.fertigBis / alle.length) * 100;
  const etappe = kurs.etappen.findIndex((e) => e.stationen.some((st) => st.nr === naechste.nr));

  return (
    <>
      <PageHeader eyebrow="Mein Lernbereich" titel="Guten Tag." text="Hier sehen Sie Ihre Kurse, Ihren Fortschritt und Ihre Bescheinigungen.">
        <PlaceholderNote>Vorschau mit Beispieldaten</PlaceholderNote>
      </PageHeader>

      <section className="section" aria-labelledby="weiter">
        <div className="container">
          <SectionHeader id="weiter" eyebrow="Weiterlernen" titel="Hier haben Sie aufgehört." />
          <article className={s.weiter}>
            <div className={s.weiterText}>
              <CategoryBadge>{themaLabel(kurs.thema)}</CategoryBadge>
              <h3 className="h3">{kurs.titel}</h3>
              <p className="muted">
                Nächste Station: <strong className={s.stark}>{naechste.titel}</strong> · Etappe {etappe + 1} · {naechste.minuten} min
              </p>
              <LearningProgress prozent={prozent} />
            </div>
            <div className={s.weiterAktion}>
              <Button href={`/lernen/${kurs.slug}/${naechste.nr}/`} arrow>Fortsetzen</Button>
            </div>
          </article>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="meine">
        <div className="container">
          <SectionHeader id="meine" eyebrow="Meine Kurse" titel="Kurse und Zugang" />
          <table className={s.tabelle}>
            <caption className="visually-hidden">Meine Kurse mit Fortschritt und Zugang</caption>
            <thead>
              <tr><th scope="col">Kurs</th><th scope="col">Fortschritt</th><th scope="col">Zugang bis</th><th scope="col"><span className="visually-hidden">Aktion</span></th></tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><Link href={`/kurse/${kurs.slug}/`}>{kurs.titel}</Link></th>
                <td><LearningProgress prozent={prozent} klein /></td>
                <td>Beispieldatum</td>
                <td><Button href={`/lernen/${kurs.slug}/${naechste.nr}/`} variant="text" arrow>Fortsetzen</Button></td>
              </tr>
            </tbody>
          </table>
          <p className="small muted" style={{ marginTop: 'var(--space-2)' }}>{courses.length - 1} weitere Kurse im Katalog. <Link href="/kurse/">Alle Kurse anzeigen</Link></p>
        </div>
      </section>

      <section className="section" aria-labelledby="bescheinigungen">
        <div className="container">
          <SectionHeader id="bescheinigungen" eyebrow="Bescheinigungen" titel="Teilnahmebescheinigungen" />
          <EmptyState icon="info" titel="Noch keine Bescheinigung." text="Sobald Sie alle Stationen eines Kurses bearbeitet haben, können Sie hier Ihre Teilnahmebescheinigung herunterladen." />
        </div>
      </section>
    </>
  );
}
