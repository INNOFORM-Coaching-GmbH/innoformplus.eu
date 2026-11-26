import type { ReactNode } from 'react';
import s from './Hero.module.css';

/** Typografischer Hero: Text links, Brand Device rechts (mobil darunter). */
export function Hero({ eyebrow, titel, text, aktionen, device, claim }: {
  eyebrow: string;
  titel: ReactNode;
  text: ReactNode;
  aktionen: ReactNode;
  device?: ReactNode;
  claim?: ReactNode;
}) {
  return (
    <section className={s.hero} aria-labelledby="hero-titel">
      <div className={`container ${s.grid}`}>
        <div className={s.text}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="hero-titel" className={`h1 ${s.h1}`}>{titel}</h1>
          <p className={`body-lg muted ${s.lead}`}>{text}</p>
          <div className={s.aktionen}>{aktionen}</div>
          {claim && <div className={s.claim}>{claim}</div>}
        </div>
        {device && <div className={s.device}>{device}</div>}
      </div>
    </section>
  );
}

/** Hero-Grafik aus dem Plattform-Prototyp: Folienbahn über Umlenkwalzen (public/brand/folienbahn.svg). Dekorativ. */
export function HeroArt() {
  return <img className={s.art} src="/brand/folienbahn.svg" alt="" width={800} height={430} />;
}

/** Brand Device: Innoform-Online-Verlauf, großes Plus, Rasterlinien, technische Typografie. Rein dekorativ bis auf die Begriffe. */
export function BrandDevice({ begriffe, unterzeile }: { begriffe: string[]; unterzeile?: string[] }) {
  return (
    <figure className={s.bd} aria-label="Innoform Plus: Leistungsversprechen">
      <svg className={s.raster} viewBox="0 0 480 560" preserveAspectRatio="none" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="560" />
        ))}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 80} x2="480" y2={i * 80} />
        ))}
      </svg>
      <svg className={s.plus} viewBox="0 0 100 100" aria-hidden>
        <path d="M38 0h24v38h38v24H62v38H38V62H0V38h38z" />
      </svg>
      <ul className={s.begriffe}>
        {begriffe.map((b, i) => (
          <li key={b}>
            <span className={s.nr}>{String(i + 1).padStart(2, '0')}</span>
            {b}
          </li>
        ))}
      </ul>
      {unterzeile && (
        <figcaption className={s.unterzeile}>
          {unterzeile.map((z) => (
            <span key={z}>{z}</span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}
