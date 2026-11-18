import type { ReactNode } from 'react';
import { TextLink } from './Button';
import s from './Section.module.css';

/** Abschnittskopf: Eyebrow, H2, optional Einleitung und Link rechts. */
export function SectionHeader({ eyebrow, titel, text, link, id, as: Tag = 'h2' }: {
  eyebrow?: string;
  titel: ReactNode;
  text?: ReactNode;
  link?: { href: string; label: string; external?: boolean };
  id?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={s.kopf}>
      <div className={s.links}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Tag id={id} className={Tag === 'h1' ? 'h1' : 'h2'}>{titel}</Tag>
        {text && <p className={`body-lg muted ${s.text}`}>{text}</p>}
      </div>
      {link && (
        <div className={s.link}>
          <TextLink href={link.href} external={link.external}>{link.label}</TextLink>
        </div>
      )}
    </div>
  );
}

/** Kennzahl: große Zahl, kurze Beschriftung. */
export function Metric({ wert, label }: { wert: string; label: string }) {
  return (
    <div className={s.metric}>
      <dt className={s.metricLabel}>{label}</dt>
      <dd className={s.metricWert}>{wert}</dd>
    </div>
  );
}

export function MetricRow({ items, hinweis }: { items: { wert: string; label: string }[]; hinweis?: ReactNode }) {
  return (
    <section className={`section--line ${s.proof}`} aria-label="Innoform Plus in Zahlen">
      <div className="container">
        <dl className={s.metrics}>
          {items.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </dl>
        {hinweis && <div className={s.hinweis}>{hinweis}</div>}
      </div>
    </section>
  );
}

/** Referenzlogos. Rendert nichts, solange keine freigegebenen Logos vorliegen. */
export function TrustBar({ logos, titel = 'Unternehmen, die mit Innoform lernen' }: { logos: { name: string; logo: string }[]; titel?: string }) {
  if (!logos.length) return null;
  return (
    <section className={s.trust} aria-label={titel}>
      <div className="container">
        <p className="eyebrow">{titel}</p>
        <ul className={s.logos}>
          {logos.map((l) => (
            <li key={l.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.logo} alt={l.name} height={32} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Abschluss-CTA auf dunkler Fläche mit Innoform-Online-Verlauf als schmalem Akzent. */
export function CallToAction({ titel, text, aktionen }: { titel: ReactNode; text?: ReactNode; aktionen: ReactNode }) {
  return (
    <section className={s.cta} aria-labelledby="cta-titel">
      <div className={`container ${s.ctaGrid}`}>
        <div>
          <h2 id="cta-titel" className={`h2 ${s.ctaTitel}`}>{titel}</h2>
          {text && <p className={`body-lg ${s.ctaText}`}>{text}</p>}
        </div>
        <div className={s.ctaAktionen}>{aktionen}</div>
      </div>
    </section>
  );
}

/** Nummerierte Punkte in einem Raster (für „Warum“, „So funktioniert’s“ …). */
export function FeatureList({ items, spalten = 3 }: { items: { titel: string; text: ReactNode }[]; spalten?: 2 | 3 | 4 }) {
  return (
    <ol className={`${s.features} ${s[`sp${spalten}`]}`}>
      {items.map((f, i) => (
        <li key={f.titel} className={s.feature}>
          <span className={s.featureNr} aria-hidden>{String(i + 1).padStart(2, '0')}</span>
          <h3 className="h3">{f.titel}</h3>
          <p className="muted">{f.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function PlaceholderNote({ children = 'Platzhalterdaten' }: { children?: ReactNode }) {
  return <span className="placeholder-note">{children}</span>;
}
