import { notFound } from 'next/navigation';
import { Lock, PlayCircle } from 'lucide-react';
import { Breadcrumb } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { SectionHeader, PlaceholderNote } from '@/components/Section';
import { CategoryBadge, CourseGrid, themaLabel } from '@/components/Course';
import { ExpertBlock } from '@/components/ExpertBlock';
import { Accordion } from '@/components/Disclosure';
import { PricingCard } from '@/components/Pricing';
import { courses, getCourse, kaufbar, stationenAnzahl, dauerMinuten, dauerText } from '@/data/courses';
import { e2g, euro, preise, site } from '@/data/site';
import { seite, jsonLd, breadcrumbs } from '@/lib/seo';
import s from './detail.module.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCourse((await params).slug);
  if (!c) return {};
  return seite({ titel: c.titel, beschreibung: c.kurzbeschreibung, pfad: `/kurse/${c.slug}/` });
}

export default async function KursDetail({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCourse((await params).slug);
  if (!c) notFound();
  const n = stationenAnzahl(c);
  const dauer = dauerText(dauerMinuten(c));
  const krumen = [{ name: 'Start', pfad: '/' }, { name: 'Kurse', pfad: '/kurse/' }, { name: c.titel, pfad: `/kurse/${c.slug}/` }];
  // Ohne funktionierenden Kauf in E2G: „Vormerken“ über das Kontaktformular von Innoform
  const kaufen = kaufbar(c) ? { href: e2g.kaufen(c.e2gEventId!), external: true } : { href: e2g.kontakt, external: true };
  const kaufLabel = kaufbar(c) ? 'Kurs kaufen' : 'Kurs vormerken';
  const inProduktion = c.status === 'in-produktion';
  const ersteStation = c.etappen[0]?.stationen[0];
  const verwandt = courses.filter((x) => x.slug !== c.slug).slice(0, 3);

  const meta: [string, React.ReactNode][] = [
    ['Dauer', dauer ?? 'folgt'],
    ['Stationen', n ?? 'folgt'],
    ['Etappen', c.etappen.length || 'folgt'],
    ['Level', c.level ?? 'folgt'],
    ['Experte', c.experte?.name ?? 'folgt'],
    ['Sprache', c.sprache],
    ['Zugriff', `${preise.einzelkurs.laufzeitMonate} Monate`],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs(krumen))} />
      {!c.platzhalter && kaufbar(c) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: c.titel,
            description: c.kurzbeschreibung,
            inLanguage: 'de',
            url: `${site.url}/kurse/${c.slug}/`,
            provider: { '@type': 'Organization', name: 'Innoform Coaching GmbH', url: 'https://www.innoform-coaching.de/' },
            offers: { '@type': 'Offer', price: preise.einzelkurs.betrag, priceCurrency: 'EUR', category: 'Paid' },
          })}
        />
      )}

      <section className={s.kopf}>
        <div className={`container ${s.kopfGrid}`}>
          <div className={s.kopfText}>
            <Breadcrumb krumen={krumen} />
            <div className={s.badges}>
              <CategoryBadge>{themaLabel(c.thema)}</CategoryBadge>
              {c.badge && <CategoryBadge ton="akzent">{c.badge}</CategoryBadge>}
              {inProduktion && <CategoryBadge ton="platzhalter">In Produktion</CategoryBadge>}
              {c.platzhalter && <CategoryBadge ton="platzhalter">Platzhalter</CategoryBadge>}
            </div>
            <h1 className={`h1 ${s.h1}`}>{c.titel}</h1>
            <p className="body-lg muted">{c.kurzbeschreibung}</p>
          </div>
          <aside className={s.box} aria-label="Kursdaten und Kauf">
            <dl className={s.meta}>
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className={s.preis}>
              {euro(preise.einzelkurs.betrag)} <small>netto</small>
            </p>
            <p className="small muted">
              {kaufbar(c) ? 'oder im All Access enthalten' : inProduktion ? 'Der Kurs wird derzeit produziert. Wir informieren Sie zum Start.' : 'Der Kauf ist noch nicht freigeschaltet. Merken Sie den Kurs vor, wir informieren Sie zum Start.'}
            </p>
            <div className={s.boxAktionen}>
              <Button {...kaufen} full>{kaufLabel}</Button>
              {ersteStation?.vorschau && (
                <Button href={`/lernen/${c.slug}/${ersteStation.nr}/`} variant="secondary" full>Vorschau ansehen</Button>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="lernziele">
        <div className={`container ${s.zweispaltig}`}>
          <SectionHeader id="lernziele" eyebrow="Was Sie lernen" titel="Lernziele" />
          {c.lernziele ? (
            <ul className={s.liste}>{c.lernziele.map((z) => <li key={z}>{z}</li>)}</ul>
          ) : (
            <div className="stack-2">
              <p className="muted">Die drei bis fünf konkreten Lernziele dieses Kurses werden ergänzt.</p>
              <PlaceholderNote />
            </div>
          )}
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="struktur">
        <div className="container">
          <SectionHeader
            id="struktur"
            eyebrow="Kursstruktur"
            titel="Etappen und Lernstationen"
            text={c.etappen.length ? `${c.etappen.length} Etappen mit ${n} Lernstationen. Die ersten Stationen sind als Vorschau frei; die übrigen werden mit dem Kauf freigeschaltet.` : undefined}
          />
          {c.etappen.length ? (
            <Accordion
              ebene="h3"
              items={c.etappen.map((e, i) => ({
                frage: `Etappe ${i + 1} · ${e.titel} (${e.stationen.length} Stationen)`,
                antwort: (
                  <ol className={s.stationen}>
                    {e.stationen.map((st) => (
                      <li key={st.nr}>
                        <span className={s.stNr}>{String(st.nr).padStart(2, '0')}</span>
                        <span className={s.stTitel}>{st.titel}</span>
                        <span className={s.stMin}>{st.minuten} min</span>
                        {st.vorschau ? (
                          <a href={`/lernen/${c.slug}/${st.nr}/`} className={s.stTag}><PlayCircle size={16} aria-hidden /> Vorschau</a>
                        ) : (
                          <span className={`${s.stTag} ${s.zu}`}><Lock size={14} aria-hidden /> nach Kauf</span>
                        )}
                      </li>
                    ))}
                  </ol>
                ),
              }))}
            />
          ) : (
            <div className="stack-2">
              <p className="muted">Die Gliederung in Etappen und Stationen wird ergänzt.</p>
              <PlaceholderNote />
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="experte">
        <div className={`container ${s.zweispaltig}`}>
          <SectionHeader id="experte" eyebrow="Experte" titel="Wer diesen Kurs verantwortet" />
          <ExpertBlock experte={c.experte} />
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="zielgruppe">
        <div className={`container ${s.zweispaltig}`}>
          <SectionHeader id="zielgruppe" eyebrow="Zielgruppe" titel="Für wen eignet sich der Kurs?" />
          {c.zielgruppe ? (
            <ul className={s.liste}>{c.zielgruppe.map((z) => <li key={z}>{z}</li>)}</ul>
          ) : (
            <div className="stack-2">
              <p className="muted">Die Zielgruppe dieses Kurses wird ergänzt.</p>
              <PlaceholderNote />
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="preis">
        <div className="container">
          <SectionHeader id="preis" eyebrow="Zugriff und Preis" titel="Einzeln kaufen oder mit All Access lernen." />
          <div className={s.preise}>
            <PricingCard t={{ name: 'Einzelkurs', preis: <>{euro(preise.einzelkurs.betrag)} <small>netto</small></>, zusatz: 'pro Person', punkte: [`${preise.einzelkurs.laufzeitMonate} Monate Zugriff`, 'Vollständiger Kurs', 'Lernfortschritt', 'Wissenschecks', 'Teilnahmebescheinigung'], cta: { label: kaufLabel, ...kaufen } }} />
            <PricingCard t={{ name: 'All Access', preis: <>{euro(preise.allAccess.jahresMonat)} <small>netto / Monat</small></>, zusatz: `pro Person, bei 12 Monaten Laufzeit – oder ${euro(preise.allAccess.monatlich)} monatlich`, beschreibung: 'Dieser und alle weiteren Kurse.', punkte: ['Alle Kurse', 'Neue Kurse inklusive', `${euro(preise.allAccess.monatlich)} monatlich oder ${euro(preise.allAccess.jahresMonat)} im Monat bei 12 Monaten`], cta: { label: 'All Access wählen', href: '/all-access/' }, hervorgehoben: true }} />
          </div>
          <p className="small muted" style={{ marginTop: 'var(--space-3)' }}>Preise netto zzgl. gesetzlicher USt. Nur für Unternehmen, Gewerbetreibende und Selbstständige.</p>
        </div>
      </section>

      {verwandt.length > 0 && (
        <section className="section section--soft" aria-labelledby="verwandt">
          <div className="container">
            <SectionHeader id="verwandt" eyebrow="Weiterlernen" titel="Verwandte Kurse" link={{ href: '/kurse/', label: 'Alle Kurse anzeigen' }} />
            <CourseGrid courses={verwandt} />
          </div>
        </section>
      )}
    </>
  );
}
