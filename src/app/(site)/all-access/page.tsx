import { PageHeader } from '@/components/PageHeader';
import { SectionHeader, FeatureList, CallToAction } from '@/components/Section';
import { PricingComparison } from '@/components/Pricing';
import { Accordion } from '@/components/Disclosure';
import { Button } from '@/components/Button';
import { euro, preise } from '@/data/site';
import { seite, jsonLd } from '@/lib/seo';

export const metadata = seite({
  titel: 'All Access',
  beschreibung: `All Access: alle Innoform-Plus-Kurse für ${euro(preise.allAccess.betrag)} netto pro Person und Jahr – neue Kurse während der Laufzeit inklusive.`,
  pfad: '/all-access/',
});

const fragen = [
  { frage: 'Was ist in All Access enthalten?', antwort: <p>Alle aktuell veröffentlichten Innoform-Plus-Kurse sowie alle Kurse, die während Ihrer Laufzeit neu erscheinen – mit allen Lernfunktionen und einer Teilnahmebescheinigung je abgeschlossenem Kurs.</p> },
  { frage: 'Wie lange gilt All Access?', antwort: <p>{preise.allAccess.laufzeitMonate} Monate ab Kauf. Einzeln gekaufte Kurse behalten ihre eigene Laufzeit von {preise.einzelkurs.laufzeitMonate} Monaten.</p> },
  { frage: 'Ab wann lohnt sich All Access?', antwort: <p>Schon ab vier Kursen: Vier Einzelkurse kosten {euro(4 * preise.einzelkurs.betrag)} netto, All Access {euro(preise.allAccess.betrag)} netto pro Jahr.</p> },
  { frage: 'Wer kann All Access buchen?', antwort: <p>Unternehmen, Gewerbetreibende und Selbstständige. All Access ist eine persönliche Lizenz für eine Person. Für mehrere Mitarbeitende bieten wir Unternehmenslösungen an.</p> },
  { frage: 'Erhalte ich eine Rechnung?', antwort: <p>Ja, eine Rechnung auf Ihr Unternehmen mit ausgewiesener Umsatzsteuer.</p> },
];

export default function AllAccess() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Was ist in All Access enthalten?', acceptedAnswer: { '@type': 'Answer', text: 'Alle aktuell veröffentlichten Innoform-Plus-Kurse sowie alle Kurse, die während der Laufzeit neu erscheinen.' } },
            { '@type': 'Question', name: 'Wie lange gilt All Access?', acceptedAnswer: { '@type': 'Answer', text: `${preise.allAccess.laufzeitMonate} Monate ab Kauf.` } },
          ],
        })}
      />
      <PageHeader
        krumen={[{ name: 'Start', pfad: '/' }, { name: 'All Access', pfad: '/all-access/' }]}
        eyebrow="All Access"
        titel="Das gesamte Kursangebot. Ein Jahr lang."
        text={`Für ${euro(preise.allAccess.betrag)} netto pro Person und Jahr lernen Sie mit allen Innoform-Plus-Kursen – neue Kurse während der Laufzeit inklusive.`}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Button href="#preise" arrow>All Access wählen</Button>
          <Button href="/kurse/" variant="secondary">Kurse ansehen</Button>
        </div>
      </PageHeader>
      <section className="section" aria-labelledby="aa-vorteile">
        <div className="container">
          <SectionHeader id="aa-vorteile" eyebrow="Ihre Vorteile" titel="Lernen ohne Einzelentscheidung." />
          <FeatureList
            items={[
              { titel: 'Alle Kurse', text: 'Zugang zum gesamten Innoform-Plus-Kursangebot – über alle Themen hinweg.' },
              { titel: 'Neue Kurse inklusive', text: 'Was während Ihrer Laufzeit erscheint, ist automatisch dabei.' },
              { titel: 'Bescheinigung je Kurs', text: 'Für jeden vollständig bearbeiteten Kurs erhalten Sie eine Teilnahmebescheinigung.' },
            ]}
          />
        </div>
      </section>
      <section className="section section--soft" id="preise" aria-labelledby="aa-preise">
        <div className="container">
          <SectionHeader id="aa-preise" eyebrow="Preise" titel="Kaufwege im Vergleich" />
          <PricingComparison />
        </div>
      </section>
      <section className="section" aria-labelledby="aa-faq">
        <div className="container" style={{ maxWidth: 960 }}>
          <SectionHeader id="aa-faq" eyebrow="Fragen" titel="Häufige Fragen zu All Access" />
          <Accordion items={fragen} />
        </div>
      </section>
      <CallToAction titel="Mehrere Mitarbeitende?" text="Für Teams und Standorte erstellen wir eine passende Unternehmenslösung." aktionen={<Button href="/fuer-unternehmen/" variant="inverse" arrow>Unternehmenslösung anfragen</Button>} />
    </>
  );
}
