import type { Metadata } from 'next';
import { site } from '@/data/site';

/** Einheitliche Metadaten je Seite: Titel, Beschreibung, Canonical, OpenGraph. `privat` = nie indexieren (Login, Dashboard, Lernansicht). */
export function seite({ titel, beschreibung, pfad, privat }: { titel: string; beschreibung: string; pfad: string; privat?: boolean }): Metadata {
  const url = `${site.url}${pfad}`;
  const ohneIndex = privat || site.preLaunch;
  return {
    title: titel,
    description: beschreibung,
    alternates: { canonical: url },
    openGraph: { title: `${titel} | ${site.name}`, description: beschreibung, url, siteName: site.name, locale: 'de_DE', type: 'website' },
    robots: ohneIndex ? { index: false, follow: !privat } : { index: true, follow: true },
  };
}

export const jsonLd = (daten: object) => ({ __html: JSON.stringify(daten).replace(/</g, '\\u003c') });

export const organisation = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Innoform Coaching GmbH',
  url: 'https://www.innoform-coaching.de/',
  brand: { '@type': 'Brand', name: site.name, url: site.url },
};

export const breadcrumbs = (teile: { name: string; pfad: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: teile.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${site.url}${t.pfad}` })),
});
