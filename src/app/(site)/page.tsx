import Link from 'next/link';
import { Hero, BrandDevice } from '@/components/Hero';
import { Button } from '@/components/Button';
import { SectionHeader, MetricRow, TrustBar, CallToAction, FeatureList } from '@/components/Section';
import { CourseGrid } from '@/components/Course';
import { PricingComparison } from '@/components/Pricing';
import { Tabs } from '@/components/Disclosure';
import { courses } from '@/data/courses';
import { kennzahlen, referenzen, themen, zielgruppen } from '@/data/site';
import { seite, jsonLd, organisation } from '@/lib/seo';
import s from './page.module.css';

export const metadata = seite({
  titel: 'Lernplattform für Flexible Packaging',
  beschreibung: 'Innoform Plus ist die spezialisierte B2B-Lernplattform für die gesamte Welt der flexiblen Verpackungen – kompakt, fundiert und jederzeit verfügbar.',
  pfad: '/',
});

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organisation)} />

      {/* 02 Hero */}
      <Hero
        eyebrow="Fachwissen. Praxisnah. Jederzeit."
        titel={<>Flexible Packaging. Kompetenz für <span className="accent">die nächste Stufe.</span></>}
        text="Innoform Plus ist die spezialisierte B2B-Lernplattform für die gesamte Welt der flexiblen Verpackungen – kompakt, fundiert und jederzeit verfügbar."
        aktionen={
          <>
            <Button href="/kurse/" arrow>Kurse entdecken</Button>
            <Button href="/all-access/" variant="secondary">All Access ansehen</Button>
          </>
        }
        claim={
          <>
            <p className="eyebrow">Technical clarity meets human expertise</p>
            <p className={s.statement}>Wissen für bessere Verpackungen. Heute. Morgen. Und darüber hinaus.</p>
          </>
        }
        device={
          <BrandDevice
            begriffe={['Fachwissen', 'Praxisbezug', 'Branchenexperten', 'Lernfortschritt', 'Starke Community']}
            unterzeile={['For a stronger', 'packaging', 'tomorrow.']}
          />
        }
      />

      {/* 03 Proof – Kennzahlen aus der Vorgabe, vor Livegang fachlich prüfen */}
      <MetricRow items={kennzahlen} />

      {/* 04 Trust – erscheint erst mit freigegebenen Referenzen */}
      <TrustBar logos={referenzen} />

      {/* 05 Beliebte Kurse */}
      <section className="section" aria-labelledby="kurse-titel">
        <div className="container">
          <SectionHeader id="kurse-titel" eyebrow="Beliebte Kurse" titel="Aktuelles Wissen für Ihre Verpackungsrolle." link={{ href: '/kurse/', label: 'Alle Kurse anzeigen' }} />
          <CourseGrid courses={courses.slice(0, 3)} />
        </div>
      </section>

      {/* 06 Warum Innoform Plus */}
      <section className="section section--soft" aria-labelledby="warum-titel">
        <div className="container">
          <SectionHeader id="warum-titel" eyebrow="Warum Innoform Plus?" titel="Strukturiertes Fachlernen statt Videoarchiv." text="Innoform Plus ergänzt Präsenzseminare, Tagungen, Webseminare und Coaching – für alle, die Fachwissen genau dann brauchen, wenn es im Projekt darauf ankommt." />
          <FeatureList
            items={[
              { titel: 'Branchenspezialisiert', text: 'Ausschließlich Flexible Packaging: Folien, Verbunde, Beutel, Abpacken, Recycling und die Prozesse dazwischen.' },
              { titel: 'Von Branchenexperten', text: 'Jeder Kurs hat einen verantwortlichen Experten aus der Praxis und wird regelmäßig auf Aktualität geprüft.' },
              { titel: 'Im eigenen Tempo', text: 'Kurze Lernstationen passen in den Arbeitsalltag – am Rechner, Tablet oder Smartphone.' },
            ]}
          />
        </div>
      </section>

      {/* 07 So funktioniert Lernen */}
      <section className="section" aria-labelledby="lernen-titel">
        <div className="container">
          <SectionHeader id="lernen-titel" eyebrow="So funktioniert Lernen" titel="Etappen. Stationen. Klarer Fortschritt." />
          <FeatureList
            spalten={4}
            items={[
              { titel: 'Etappen', text: 'Jeder Kurs ist in thematische Etappen gegliedert, die aufeinander aufbauen.' },
              { titel: 'Lernstationen', text: 'Kurze Videos mit den Kernaussagen jeder Station auf einen Blick.' },
              { titel: 'Wissenschecks', text: 'Fragen zur Selbstkontrolle mit sofortiger Erklärung – unbewertet.' },
              { titel: 'Bescheinigung', text: 'Nach vollständiger Bearbeitung erhalten Sie eine Teilnahmebescheinigung.' },
            ]}
          />
        </div>
      </section>

      {/* 08 Themen / Zielgruppen / Lernpfade */}
      <section className="section section--soft" aria-labelledby="themen-titel">
        <div className="container">
          <SectionHeader id="themen-titel" eyebrow="Kurse, Themen, Lernpfade" titel="Die ganze Welt der flexiblen Verpackungen." />
          <Tabs
            label="Themen und Zielgruppen"
            tabs={[
              {
                id: 'themen',
                label: 'Themen',
                inhalt: (
                  <ul className={s.themen}>
                    {themen.map((t) => {
                      const n = courses.filter((c) => c.thema === t.slug).length;
                      return (
                        <li key={t.slug}>
                          <Link href={`/kurse/?thema=${t.slug}`} className={s.thema}>
                            <span>{t.label}</span>
                            <span className={s.themaZahl}>{n ? `${n} ${n === 1 ? 'Kurs' : 'Kurse'}` : 'in Vorbereitung'}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ),
              },
              {
                id: 'zielgruppen',
                label: 'Für wen',
                inhalt: (
                  <div className={s.zielgruppen}>
                    <p className="body-lg muted">Für Fach- und Führungskräfte aus</p>
                    <ul>
                      {zielgruppen.map((z) => <li key={z}>{z}</li>)}
                    </ul>
                  </div>
                ),
              },
              {
                id: 'lernpfade',
                label: 'Lernpfade',
                inhalt: (
                  <div className={s.lernpfade}>
                    <p className="body-lg muted">Lernpfade verbinden mehrere Kurse zu einem roten Faden – etwa für den Einstieg in die Branche oder für eine Rolle im Unternehmen.</p>
                    <Button href="/lernpfade/" variant="text" arrow>Zu den Lernpfaden</Button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* 09 All Access */}
      <section className="section" aria-labelledby="preise-titel">
        <div className="container">
          <SectionHeader id="preise-titel" eyebrow="All Access" titel="Ein Kurs, alle Kurse oder Ihr ganzes Team." text="Schon ab vier Kursen lohnt sich All Access gegenüber dem Einzelkauf." />
          <PricingComparison />
        </div>
      </section>

      {/* 10 Expertenkompetenz */}
      <section className="section section--soft" aria-labelledby="experten-titel">
        <div className="container">
          <SectionHeader id="experten-titel" eyebrow="Expertenkompetenz" titel="Wissen aus der Praxis, regelmäßig geprüft." link={{ href: '/ueber-uns/', label: 'Über Innoform Plus' }} />
          <FeatureList
            items={[
              { titel: 'Verantwortliche Experten', text: 'Jeder Kurs wird von einem Experten aus der Branche gestaltet und fachlich verantwortet.' },
              { titel: 'Aktualitätsprüfung', text: 'Inhalte werden regelmäßig geprüft. Aktualisierungen sind während Ihres Zugangs inklusive.' },
              { titel: 'Teil von Innoform', text: 'Innoform Plus ergänzt die Präsenzseminare, Tagungen, Webseminare und Coachings von Innoform.' },
            ]}
          />
        </div>
      </section>

      {/* 11 Corporate Learning */}
      <section className="section" aria-labelledby="firmen-titel">
        <div className={`container ${s.firmen}`}>
          <div>
            <p className="eyebrow">Corporate Learning</p>
            <h2 id="firmen-titel" className="h2">Für Teams, Standorte und Business Units.</h2>
          </div>
          <div className="stack-3">
            <p className="body-lg muted">Mehrere Mitarbeitende? Wir stellen eine Lösung mit zentraler Verwaltung, Firmenrechnung und den passenden Sprachen zusammen – persönlich beraten statt Preisliste.</p>
            <Button href="/fuer-unternehmen/" variant="secondary" arrow>Unternehmenslösung anfragen</Button>
          </div>
        </div>
      </section>

      {/* 12 Final CTA */}
      <CallToAction
        titel="Wissen, wann Sie es brauchen."
        text="Starten Sie mit einem Kurs – oder mit dem gesamten Angebot."
        aktionen={
          <>
            <Button href="/kurse/" arrow>Kurse entdecken</Button>
            <Button href="/all-access/" variant="inverse">All Access ansehen</Button>
          </>
        }
      />
    </>
  );
}
