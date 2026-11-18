import { PageHeader } from '@/components/PageHeader';
import { SectionHeader, FeatureList } from '@/components/Section';
import { Button } from '@/components/Button';
import { seite } from '@/lib/seo';
import { Anfrage } from './Anfrage';
import s from './unternehmen.module.css';

export const metadata = seite({
  titel: 'Für Unternehmen',
  beschreibung: 'Corporate Learning mit Innoform Plus: Unternehmenslösungen für mehrere Mitarbeitende, Standorte und Sprachen – persönlich beraten.',
  pfad: '/fuer-unternehmen/',
});

export default function FuerUnternehmen() {
  return (
    <>
      <PageHeader
        krumen={[{ name: 'Start', pfad: '/' }, { name: 'Für Unternehmen', pfad: '/fuer-unternehmen/' }]}
        eyebrow="Corporate Learning"
        titel="Fachwissen für Ihr ganzes Team."
        text="Für mehrere Mitarbeitende, Standorte, Business Units und internationale Teams stellen wir eine passende Lösung zusammen – mit individueller Nutzerzahl und Vertragsgestaltung."
      >
        <div><Button href="#anfrage" arrow>Unternehmenslösung anfragen</Button></div>
      </PageHeader>
      <section className="section" aria-labelledby="ul-leistungen">
        <div className="container">
          <SectionHeader id="ul-leistungen" eyebrow="Leistungen" titel="Was eine Unternehmenslösung umfasst." />
          <FeatureList
            items={[
              { titel: 'Zentrale Verwaltung', text: 'Nutzerinnen und Nutzer werden zentral für Ihr Unternehmen verwaltet.' },
              { titel: 'Firmenrechnung', text: 'Eine Rechnung für Ihr Unternehmen statt vieler Einzelkäufe.' },
              { titel: 'Standorte und Sprachen', text: 'Mehrere Standorte und Sprachen sind technisch vorgesehen.' },
            ]}
          />
        </div>
      </section>
      <section className="section section--soft" id="anfrage" aria-labelledby="ul-anfrage">
        <div className={`container ${s.layout}`}>
          <SectionHeader
            id="ul-anfrage"
            eyebrow="Anfrage"
            titel="Sprechen Sie mit uns."
            text="Erzählen Sie uns von Ihrem Weiterbildungsbedarf. Wir melden uns persönlich – ohne Preisliste, mit einer Lösung, die passt."
          />
          <Anfrage />
        </div>
      </section>
    </>
  );
}
