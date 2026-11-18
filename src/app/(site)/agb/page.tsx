import { Rechtsseite } from '@/components/Rechtsseite';
import { e2g } from '@/data/site';
import { seite } from '@/lib/seo';

export const metadata = seite({ titel: 'AGB', beschreibung: 'AGB von Innoform Plus.', pfad: '/agb/' });

export default function Page() {
  return <Rechtsseite titel="AGB" pfad="/agb/" ziel={e2g.agb} text="Für Käufe gelten die Allgemeinen Geschäftsbedingungen von innoform-coaching.de." />;
}
