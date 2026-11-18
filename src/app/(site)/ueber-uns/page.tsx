import { PageHeader } from '@/components/PageHeader';
import { SectionHeader, FeatureList, CallToAction } from '@/components/Section';
import { Button } from '@/components/Button';
import { e2g } from '@/data/site';
import { seite } from '@/lib/seo';

export const metadata = seite({
  titel: 'Über Innoform Plus',
  beschreibung: 'Innoform Plus ist die Online-Lernplattform von Innoform für Flexible Packaging – als Ergänzung zu Präsenzseminaren, Tagungen, Webseminaren und Coaching.',
  pfad: '/ueber-uns/',
});

export default function UeberUns() {
  return (
    <>
      <PageHeader
        krumen={[{ name: 'Start', pfad: '/' }, { name: 'Über uns', pfad: '/ueber-uns/' }]}
        eyebrow="Über Innoform Plus"
        titel="Technical clarity meets human expertise."
        text="Innoform Plus ist die spezialisierte Online-Lernplattform von Innoform für Flexible Packaging. Sie ergänzt Präsenzseminare, Tagungen, Webseminare und Coaching – und ersetzt sie nicht."
      />
      <section className="section" aria-labelledby="uu-haltung">
        <div className="container">
          <SectionHeader id="uu-haltung" eyebrow="Unsere Haltung" titel="Was Innoform Plus ausmacht." />
          <FeatureList
            items={[
              { titel: 'Strukturiertes Fachlernen', text: 'Kurse in Etappen und kurzen Lernstationen statt eines unsortierten Videoarchivs.' },
              { titel: 'Expertenwissen', text: 'Jeder Kurs wird von einem Experten aus der Branche verantwortet und regelmäßig auf Aktualität geprüft.' },
              { titel: 'Für die Praxis', text: 'Für Fach- und Führungskräfte, die Wissen dann brauchen, wenn es im Projekt darauf ankommt.' },
            ]}
          />
        </div>
      </section>
      <section className="section section--soft" aria-labelledby="uu-innoform">
        <div className="container">
          <SectionHeader
            id="uu-innoform"
            eyebrow="Innoform"
            titel="Ein Angebot der Innoform Coaching GmbH."
            text="Mehr über Innoform, unsere Seminare, Tagungen und Webseminare erfahren Sie auf innoform-coaching.de."
            link={{ href: e2g.innoform, label: 'innoform-coaching.de', external: true }}
          />
        </div>
      </section>
      <CallToAction titel="Bereit für die nächste Stufe?" aktionen={<><Button href="/kurse/" arrow>Kurse entdecken</Button><Button href="/kontakt/" variant="inverse">Kontakt</Button></>} />
    </>
  );
}
