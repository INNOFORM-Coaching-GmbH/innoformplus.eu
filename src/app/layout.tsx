import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/data/site';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – Lernplattform für Flexible Packaging`, template: `%s | ${site.name}` },
  description: site.description,
  robots: site.preLaunch ? { index: false, follow: true } : undefined,
};

export const viewport: Viewport = { themeColor: '#001C46', width: 'device-width', initialScale: 1 };

/** Gemeinsamer Rahmen. Website-Seiten liegen in (site) mit Kopf und Fuß, die Lernansicht in lernen/ mit schlankem Kopf. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preload" href="/fonts/lato-900-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/lato-400-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a href="#inhalt" className="skip-link">Zum Inhalt springen</a>
        {children}
      </body>
    </html>
  );
}
