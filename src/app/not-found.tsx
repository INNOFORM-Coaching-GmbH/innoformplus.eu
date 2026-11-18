import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';

/** Wird beim statischen Export als 404.html ausgeliefert (GitHub Pages). */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="inhalt" tabIndex={-1}>
        <PageHeader eyebrow="Fehler 404" titel="Diese Seite gibt es nicht." text="Vielleicht hat sich die Adresse geändert. Starten Sie auf der Startseite oder im Kurskatalog.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <Button href="/" arrow>Zur Startseite</Button>
            <Button href="/kurse/" variant="secondary">Kurse ansehen</Button>
          </div>
        </PageHeader>
      </main>
      <Footer />
    </>
  );
}
