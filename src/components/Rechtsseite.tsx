import { PageHeader } from './PageHeader';
import { Button } from './Button';
import { PlaceholderNote } from './Section';

/** Platzhalter für Rechtstexte: verweist auf die geltenden Texte von innoform-coaching.de, bis eigene, juristisch geprüfte Texte vorliegen. */
export function Rechtsseite({ titel, pfad, ziel, text }: { titel: string; pfad: string; ziel: string; text: string }) {
  return (
    <>
      <PageHeader krumen={[{ name: 'Start', pfad: '/' }, { name: titel, pfad }]} eyebrow="Rechtliches" titel={titel} />
      <section className="section">
        <div className="container prose">
          <p className="body-lg">{text}</p>
          <p className="muted">Eigene Rechtstexte für Innoform Plus werden vor dem offiziellen Start juristisch geprüft und hier veröffentlicht.</p>
          <PlaceholderNote>Rechtstext folgt</PlaceholderNote>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <Button href={ziel} external variant="secondary" arrow>{titel} auf innoform-coaching.de</Button>
          </div>
        </div>
      </section>
    </>
  );
}
