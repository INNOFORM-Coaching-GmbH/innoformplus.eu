import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/PageHeader';
import { Button } from '@/components/Button';
import { SectionHeader, PlaceholderNote } from '@/components/Section';
import { CourseGrid } from '@/components/Course';
import { ExpertPortrait } from '@/components/ExpertBlock';
import { experten, getExperte, kurseVon, rolleText } from '@/data/experten';
import { seite, jsonLd, breadcrumbs } from '@/lib/seo';
import s from '../experten.module.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return experten.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const e = getExperte((await params).slug);
  if (!e) return {};
  return seite({ titel: e.name, beschreibung: e.kurzprofil ?? `${e.name}, ${rolleText(e)} – Experte bei Innoform Plus.`, pfad: `/experten/${e.slug}/` });
}

export default async function ExperteProfil({ params }: { params: Promise<{ slug: string }> }) {
  const e = getExperte((await params).slug);
  if (!e) notFound();
  const kurse = kurseVon(e.slug);
  const krumen = [{ name: 'Start', pfad: '/' }, { name: 'Experten', pfad: '/experten/' }, { name: e.name, pfad: `/experten/${e.slug}/` }];
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: e.name,
    jobTitle: e.rolle !== e.firma ? e.rolle : undefined,
    worksFor: { '@type': 'Organization', name: e.firma },
    sameAs: [e.linkedin, e.profilInnoform].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbs(krumen))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(person)} />
      <section className="section section--soft">
        <div className="container stack-3">
          <Breadcrumb krumen={krumen} />
          <div className={s.kopf}>
            <ExpertPortrait experte={e} gross />
            <div className="stack-1">
              <p className="eyebrow">Experte</p>
              <h1 className="h1">{e.name}</h1>
              <p className={s.rolle}>{rolleText(e)}</p>
              {e.kurzprofil && <p className="body-lg muted">{e.kurzprofil}</p>}
              <div className={s.links}>
                {e.linkedin && <Button href={e.linkedin} variant="secondary" external>LinkedIn</Button>}
                {e.web && <Button href={e.web.href} variant="secondary" external>{e.web.label}</Button>}
                <Button href={e.profilInnoform} variant="secondary" external>Profil bei Innoform Coaching</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="werdegang">
        <div className={`container ${s.zweispaltig}`}>
          <SectionHeader id="werdegang" eyebrow="Werdegang" titel="Wer ist das?" />
          {e.werdegang?.length ? (
            <div className={`body-lg ${s.werdegang}`}>{e.werdegang.map((a) => <p key={a}>{a}</p>)}</div>
          ) : (
            <div className="stack-2">
              <p className="muted">Ein ausführliches Profil wird ergänzt.</p>
              <PlaceholderNote />
            </div>
          )}
        </div>
      </section>

      {e.schwerpunkte?.length || e.lieblingsthemen?.length ? (
        <section className="section section--soft" aria-labelledby="schwerpunkte">
          <div className={`container ${s.zweispaltig}`}>
            <SectionHeader id="schwerpunkte" eyebrow="Schwerpunkte" titel="Fachgebiete" />
            <div className="stack-3">
              {e.schwerpunkte?.length ? (
                <div className="stack-1">
                  <h3 className={s.unter}>Kenntnisse</h3>
                  <ul className={s.schwerpunkte}>{e.schwerpunkte.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ) : null}
              {e.lieblingsthemen?.length ? (
                <div className="stack-1">
                  <h3 className={s.unter}>Lieblingsthemen</h3>
                  <ul className={`${s.schwerpunkte} ${s.themen}`}>{e.lieblingsthemen.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" aria-labelledby="kurse">
        <div className="container">
          <SectionHeader id="kurse" eyebrow="Kurse" titel={kurse.length === 1 ? 'Kurs auf Innoform Plus' : 'Kurse auf Innoform Plus'} link={{ href: '/kurse/', label: 'Alle Kurse' }} />
          {kurse.length ? <CourseGrid courses={kurse} /> : <p className="muted">Kurse folgen.</p>}
        </div>
      </section>
    </>
  );
}
