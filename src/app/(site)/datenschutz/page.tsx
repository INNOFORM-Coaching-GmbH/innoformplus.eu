import { Rechtsseite } from '@/components/Rechtsseite';
import { e2g } from '@/data/site';
import { seite } from '@/lib/seo';

export const metadata = seite({ titel: 'Datenschutz', beschreibung: 'Datenschutz von Innoform Plus.', pfad: '/datenschutz/' });

export default function Page() {
  return <Rechtsseite titel="Datenschutz" pfad="/datenschutz/" ziel={e2g.datenschutz} text="Es gilt die Datenschutzerklärung von innoform-coaching.de." />;
}
