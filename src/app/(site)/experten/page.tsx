import { PageHeader } from '@/components/PageHeader';
import { CallToAction } from '@/components/Section';
import { Button } from '@/components/Button';
import { ExpertCard } from '@/components/ExpertBlock';
import { experten, kurseVon } from '@/data/experten';
import { seite } from '@/lib/seo';
import s from './experten.module.css';

export const metadata = seite({
  titel: 'Experten',
  beschreibung: 'Die Experten hinter den Kursen von Innoform Plus – Fachleute aus der Flexpack-Branche, die ihre Kurse inhaltlich verantworten.',
  pfad: '/experten/',
});

export default function Experten() {
  return (
    <>
      <PageHeader
        krumen={[{ name: 'Start', pfad: '/' }, { name: 'Experten', pfad: '/experten/' }]}
        eyebrow="Expertenkompetenz"
        titel="Die Menschen hinter den Kursen."
        text="Jeder Kurs auf Innoform Plus wird von Fachleuten aus der Branche gestaltet und inhaltlich verantwortet – aus Folienherstellung, Prüflabor und Maschinenbau."
      />
      <section className="section" aria-label="Alle Experten">
        <ul className={`container ${s.liste}`}>
          {experten.map((e) => (
            <li key={e.slug}>
              <ExpertCard experte={e} kurse={kurseVon(e.slug).length} />
            </li>
          ))}
        </ul>
      </section>
      <CallToAction
        titel="Wissen aus erster Hand."
        text="Lernen Sie in kurzen Stationen direkt von den Experten."
        aktionen={<Button href="/kurse/" arrow>Kurse entdecken</Button>}
      />
    </>
  );
}
