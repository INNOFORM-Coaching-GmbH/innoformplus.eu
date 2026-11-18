import { PageHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/Section';
import { Button } from '@/components/Button';
import { e2g } from '@/data/site';
import { seite } from '@/lib/seo';

export const metadata = seite({ titel: 'Kontakt', beschreibung: 'Kontakt zu Innoform Plus.', pfad: '/kontakt/' });

export default function Kontakt() {
  return (
    <>
      <PageHeader krumen={[{ name: 'Start', pfad: '/' }, { name: 'Kontakt', pfad: '/kontakt/' }]} eyebrow="Kontakt" titel="Wir sind für Sie da." text="Fragen zu Kursen, Rechnungen oder Ihrem Zugang beantwortet das Innoform-Team." />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 'var(--space-6)' }}>
          <div>
            <SectionHeader eyebrow="Allgemeine Fragen" titel="Kontaktformular" text="Bis Innoform Plus ein eigenes Formular hat, erreichen Sie uns über innoform-coaching.de." />
            <Button href={e2g.kontakt} external variant="secondary" arrow>Zum Kontakt auf innoform-coaching.de</Button>
          </div>
          <div>
            <SectionHeader eyebrow="Für Unternehmen" titel="Corporate Learning anfragen" text="Für mehrere Mitarbeitende, Standorte oder Sprachen beraten wir Sie persönlich." />
            <Button href="/fuer-unternehmen/#anfrage" arrow>Unternehmenslösung anfragen</Button>
          </div>
        </div>
      </section>
    </>
  );
}
