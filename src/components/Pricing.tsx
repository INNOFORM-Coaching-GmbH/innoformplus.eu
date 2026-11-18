import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { euro, preise } from '@/data/site';
import s from './Pricing.module.css';

export type Tarif = {
  name: string;
  preis: ReactNode;
  zusatz?: string;
  beschreibung?: string;
  punkte: string[];
  cta: { label: string; href: string; external?: boolean };
  hervorgehoben?: boolean;
  dunkel?: boolean;
};

export function PricingCard({ t, ebene = 'h3' }: { t: Tarif; ebene?: 'h2' | 'h3' }) {
  const Titel = ebene;
  return (
    <article className={`${s.card} ${t.hervorgehoben ? s.hervor : ''} ${t.dunkel ? s.dunkel : ''}`}>
      {t.hervorgehoben && <p className={s.marke}>Empfohlen</p>}
      <Titel className={s.name}>{t.name}</Titel>
      <p className={s.preis}>{t.preis}</p>
      {t.zusatz && <p className={s.zusatz}>{t.zusatz}</p>}
      {t.beschreibung && <p className={s.beschreibung}>{t.beschreibung}</p>}
      <ul className={s.punkte}>
        {t.punkte.map((p) => (
          <li key={p}>
            <Check size={18} strokeWidth={2} aria-hidden />
            {p}
          </li>
        ))}
      </ul>
      <Button href={t.cta.href} external={t.cta.external} variant={t.dunkel ? 'inverse' : t.hervorgehoben ? 'primary' : 'secondary'} full>
        {t.cta.label}
      </Button>
    </article>
  );
}

/** Die drei Kaufwege aus dem Briefing. */
export const tarife: Tarif[] = [
  {
    name: 'Einzelkurs',
    preis: <>{euro(preise.einzelkurs.betrag)} <small>netto</small></>,
    zusatz: 'pro Person und Kurs',
    punkte: [`${preise.einzelkurs.laufzeitMonate} Monate Zugriff`, 'Vollständiger Kurs', 'Lernfortschritt', 'Wissenschecks', 'Teilnahmebescheinigung'],
    cta: { label: 'Kurs kaufen', href: '/kurse/' },
  },
  {
    name: 'All Access',
    preis: <>{euro(preise.allAccess.betrag)} <small>netto / Jahr</small></>,
    zusatz: 'pro Person',
    beschreibung: 'Zugang zum gesamten Innoform-Plus-Kursangebot.',
    punkte: ['Alle Kurse', 'Neue Kurse inklusive', `${preise.allAccess.laufzeitMonate} Monate Zugriff`],
    cta: { label: 'All Access wählen', href: '/all-access/' },
    hervorgehoben: true,
  },
  {
    name: 'Für Unternehmen',
    preis: 'Corporate Learning',
    zusatz: 'Preis auf Anfrage',
    beschreibung: 'Mehrere Mitarbeitende? Wir erstellen eine passende Lösung.',
    punkte: ['Zentrale Verwaltung', 'Firmenrechnung', 'Mehrere Standorte und Sprachen'],
    cta: { label: 'Unternehmenslösung anfragen', href: '/fuer-unternehmen/#anfrage' },
    dunkel: true,
  },
];

export function PricingComparison({ ebene }: { ebene?: 'h2' | 'h3' }) {
  return (
    <div>
      <ul className={s.grid}>
        {tarife.map((t) => (
          <li key={t.name}>
            <PricingCard t={t} ebene={ebene} />
          </li>
        ))}
      </ul>
      <p className={`small muted ${s.fuss}`}>
        Alle Preise netto zuzüglich gesetzlicher Umsatzsteuer. Das Angebot richtet sich ausschließlich an Unternehmen, Gewerbetreibende und Selbstständige.
      </p>
    </div>
  );
}
