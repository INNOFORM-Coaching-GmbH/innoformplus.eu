import { Rechtsseite } from '@/components/Rechtsseite';
import { e2g } from '@/data/site';
import { seite } from '@/lib/seo';

export const metadata = seite({ titel: 'Impressum', beschreibung: 'Impressum von Innoform Plus.', pfad: '/impressum/' });

export default function Page() {
  return <Rechtsseite titel="Impressum" pfad="/impressum/" ziel={e2g.impressum} text="Anbieter von Innoform Plus ist die Innoform Coaching GmbH. Es gilt das Impressum von innoform-coaching.de." />;
}
