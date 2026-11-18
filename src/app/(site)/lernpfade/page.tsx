import { PageHeader } from '@/components/PageHeader';
import { SectionHeader, FeatureList } from '@/components/Section';
import { EmptyState } from '@/components/States';
import { Button } from '@/components/Button';
import { seite } from '@/lib/seo';

export const metadata = seite({
  titel: 'Lernpfade',
  beschreibung: 'Lernpfade verbinden mehrere Innoform-Plus-Kurse zu einem roten Faden – für den Einstieg in die Branche oder eine Rolle im Unternehmen.',
  pfad: '/lernpfade/',
});

export default function Lernpfade() {
  return (
    <>
      <PageHeader
        krumen={[{ name: 'Start', pfad: '/' }, { name: 'Lernpfade', pfad: '/lernpfade/' }]}
        eyebrow="Lernpfade"
        titel="Mehrere Kurse, ein roter Faden."
        text="Lernpfade bündeln Kurse in einer sinnvollen Reihenfolge – etwa für den Einstieg in die Branche oder für eine bestimmte Rolle im Unternehmen."
      />
      <section className="section" aria-labelledby="lp-titel">
        <div className="container">
          <SectionHeader id="lp-titel" eyebrow="Aktuelle Lernpfade" titel="In Vorbereitung" />
          <EmptyState
            icon="info"
            titel="Die ersten Lernpfade entstehen gerade."
            text="Sobald genügend Kurse veröffentlicht sind, stellen wir sie hier zu Lernpfaden zusammen. Bis dahin finden Sie alle verfügbaren Kurse im Katalog."
            aktion={<Button href="/kurse/" variant="secondary" arrow>Zum Kurskatalog</Button>}
          />
        </div>
      </section>
      <section className="section section--soft" aria-labelledby="lp-wie">
        <div className="container">
          <SectionHeader id="lp-wie" eyebrow="So funktionieren Lernpfade" titel="Aufeinander aufbauen, statt suchen." />
          <FeatureList
            items={[
              { titel: 'Geordnete Kursfolge', text: 'Jeder Lernpfad legt fest, welcher Kurs wann sinnvoll ist.' },
              { titel: 'Gemeinsamer Fortschritt', text: 'Sie sehen auf einen Blick, wie weit Sie im gesamten Pfad sind.' },
              { titel: 'Mit All Access inklusive', text: 'Mit All Access sind alle Kurse eines Lernpfads enthalten.' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
