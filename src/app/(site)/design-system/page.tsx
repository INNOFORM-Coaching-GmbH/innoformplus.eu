import { PageHeader } from '@/components/PageHeader';
import { SectionHeader, Metric, PlaceholderNote } from '@/components/Section';
import { Button } from '@/components/Button';
import { CategoryBadge, CourseCard } from '@/components/Course';
import { LearningProgress, ModuleNavigation, LessonNavigation, type Zustand } from '@/components/Learning';
import { KnowledgeCheck } from '@/components/KnowledgeCheck';
import { PricingCard, tarife } from '@/components/Pricing';
import { ExpertBlock } from '@/components/ExpertBlock';
import { Accordion } from '@/components/Disclosure';
import { EmptyState, LoadingState, Skeleton, Pagination } from '@/components/States';
import { BrandDevice } from '@/components/Hero';
import { courses } from '@/data/courses';
import { demoFrage } from '@/data/demo';
import { seite } from '@/lib/seo';
import { Interaktiv } from './Interaktiv';
import s from './ds.module.css';

export const metadata = seite({ titel: 'Designsystem', beschreibung: 'Komponenten und Tokens von Innoform Plus.', pfad: '/design-system/', privat: true });

const farben = [
  ['Navy', '--color-navy', '#001C46'], ['Blue', '--color-blue', '#0D4978'], ['Magenta', '--color-magenta', '#D83B68'],
  ['Magenta Text', '--color-magenta-text', '#BF2F58'], ['Orange', '--color-orange', '#FA6C13'], ['Cyan', '--color-cyan', '#3DC1D3'],
  ['Text', '--color-text', '#151515'], ['Text muted', '--color-text-muted', '#4C4C4C'], ['Bg soft', '--color-bg-soft', '#F4F4F4'], ['Border', '--color-border', '#E3E6EA'],
];

const etappenDemo = courses[0].etappen.slice(0, 2);
const zustandDemo = (nr: number): Zustand => (nr <= 3 ? 'fertig' : nr === 4 ? 'aktuell' : nr <= 7 ? 'offen' : 'gesperrt');

export default function DesignSystem() {
  return (
    <>
      <PageHeader eyebrow="Intern" titel="Designsystem" text="Tokens und Komponenten von Innoform Plus. Neue Muster zuerst hier ergänzen, dann in Seiten verwenden." />

      <section className="section" aria-labelledby="ds-farben">
        <div className="container">
          <SectionHeader id="ds-farben" eyebrow="Tokens" titel="Farben" />
          <ul className={s.farben}>
            {farben.map(([n, v, h]) => (
              <li key={v}><span className={s.swatch} style={{ background: `var(${v})` }} /><b>{n}</b><code>{v}</code><span className="small muted">{h}</span></li>
            ))}
            <li><span className={s.swatch} style={{ background: 'var(--gradient-online)' }} /><b>Online-Verlauf</b><code>--gradient-online</code><span className="small muted">135°, Magenta → Blue</span></li>
          </ul>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="ds-typo">
        <div className="container stack-3">
          <SectionHeader id="ds-typo" eyebrow="Tokens" titel="Typografie" />
          <p className="eyebrow">Eyebrow · 0.75rem · 700 · 0.16em</p>
          <p className="h1">H1 Kompetenz</p>
          <p className="h2">H2 Aktuelles Wissen für Ihre Verpackungsrolle.</p>
          <p className="h3">H3 Aufbau und Eigenschaften von Folienverbunden</p>
          <p className="body-lg">Body Large – Innoform Plus ist die spezialisierte B2B-Lernplattform.</p>
          <p>Body – Fließtext in Lato Regular, 1rem, Zeilenhöhe 1.55.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="ds-buttons">
        <div className="container stack-3">
          <SectionHeader id="ds-buttons" eyebrow="Komponenten" titel="Buttons" text="Zustände: default, hover, focus-visible (Tab-Taste), active, disabled, loading." />
          <div className={s.reihe}><Button>Primary</Button><Button arrow>Mit Pfeil</Button><Button disabled>Disabled</Button><Button loading>Wird gesendet</Button></div>
          <div className={s.reihe}><Button variant="secondary">Secondary</Button><Button variant="secondary" disabled>Disabled</Button><Button variant="secondary" loading>Lädt</Button></div>
          <div className={s.reihe}><Button href="/kurse/" variant="text" arrow>Text-Link</Button></div>
          <div className={`${s.reihe} ${s.dunkel}`}><Button variant="inverse">Inverse auf Navy</Button></div>
          <div className={s.reihe}><CategoryBadge>Folien</CategoryBadge><CategoryBadge ton="akzent">Neu</CategoryBadge><CategoryBadge ton="platzhalter">Platzhalter</CategoryBadge><PlaceholderNote /></div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="ds-karten">
        <div className="container stack-4">
          <SectionHeader id="ds-karten" eyebrow="Komponenten" titel="Karten, Kennzahlen, Brand Device" />
          <div className={s.dreier}>
            <CourseCard course={courses[0]} />
            <PricingCard t={tarife[1]} />
            <div style={{ minHeight: 420 }}><BrandDevice begriffe={['Fachwissen', 'Praxisbezug']} /></div>
          </div>
          <dl className={s.metrics}><Metric wert="4–7 Min." label="pro Lernstation" /><Metric wert="24 Monate" label="Zugriff auf Einzelkurse" /></dl>
          <ExpertBlock />
        </div>
      </section>

      <section className="section" aria-labelledby="ds-lernen">
        <div className="container stack-4">
          <SectionHeader id="ds-lernen" eyebrow="Komponenten" titel="Lernen" text="Abgeschlossen: Haken · Aktuell: Magenta-Markierung · Offen: Kreis · Gesperrt: grau mit Schloss." />
          <LearningProgress prozent={42} />
          <div className={s.zweier}>
            <ModuleNavigation etappen={etappenDemo} zustand={zustandDemo} href={() => '#'} aktuell={4} />
            <KnowledgeCheck frage={demoFrage} />
          </div>
          <LessonNavigation zurueck={{ href: '#', titel: 'Vorherige Station' }} weiter={{ href: '#', titel: 'Nächste Station' }} />
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="ds-zustaende">
        <div className="container stack-4">
          <SectionHeader id="ds-zustaende" eyebrow="Komponenten" titel="Formulare, Dialoge, Zustände" />
          <Interaktiv />
          <EmptyState titel="Keine passenden Kurse gefunden." text="Leerer Zustand mit Hinweis und Aktion." />
          <LoadingState />
          <Skeleton zeilen={3} />
          <Pagination seite={2} seiten={4} href={() => '#'} />
          <Accordion items={[{ frage: 'Akkordeon-Frage', antwort: <p>Antwort im Akkordeon.</p> }, { frage: 'Zweite Frage', antwort: <p>Noch eine Antwort.</p> }]} />
        </div>
      </section>
    </>
  );
}
