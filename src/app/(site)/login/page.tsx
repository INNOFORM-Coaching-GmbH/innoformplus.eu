import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { e2g } from '@/data/site';
import { seite } from '@/lib/seo';

export const metadata = seite({ titel: 'Login', beschreibung: 'Anmelden bei Innoform Plus.', pfad: '/login/', privat: true });

/** Kein eigenes Passwortfeld: Die Anmeldung läuft über das Innoform-Konto in E2G, bis die Plattform eine eigene Anmeldung hat. */
export default function Login() {
  return (
    <>
      <PageHeader krumen={[{ name: 'Start', pfad: '/' }, { name: 'Login', pfad: '/login/' }]} eyebrow="Login" titel="Willkommen zurück." text="Sie melden sich mit Ihrem Innoform-Konto an – denselben Zugangsdaten wie für Webseminare und Seminare." />
      <section className="section">
        <div className="container" style={{ maxWidth: 640, display: 'grid', gap: 'var(--space-3)', justifyItems: 'start' }}>
          <Button href={e2g.login} external arrow>Mit Innoform-Konto anmelden</Button>
          <p className="muted">Noch kein Konto? Beim ersten Kauf legen Sie Ihr Konto an.</p>
          <Button href="/kurse/" variant="text" arrow>Kurse entdecken</Button>
        </div>
      </section>
    </>
  );
}
