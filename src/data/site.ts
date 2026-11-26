// Zentrale Angaben der Website. Alles, was nach außen zeigt (E2G, Rechtstexte), steht hier.

export const site = {
  name: 'Innoform Plus',
  url: 'https://www.innoformplus.eu',
  description:
    'Innoform Plus ist die spezialisierte B2B-Lernplattform für die gesamte Welt der flexiblen Verpackungen – kompakt, fundiert und jederzeit verfügbar.',
  /** Vorabversion: Suchmaschinen gesperrt (meta robots + robots.txt). Zum Start auf false setzen und public/robots.txt anpassen. */
  preLaunch: true,
};

/** Ziele in E2G (innoform-coaching.de). Kauf, Konto und Lernen laufen dort, bis die Plattform eigene Seiten hat. */
export const e2g = {
  login: 'https://www.innoform-coaching.de/site/event2go/list.php',
  kaufen: (eventId: number) => `https://www.innoform-coaching.de/site/event/participate.php?event_id=${eventId}`,
  innoform: 'https://www.innoform-coaching.de/',
  kontakt: 'https://www.innoform-coaching.de/kontakt',
  impressum: 'https://www.innoform-coaching.de/impressum',
  datenschutz: 'https://www.innoform-coaching.de/datenschutz',
  agb: 'https://www.innoform-coaching.de/agb',
};

export const mainNav = [
  { href: '/kurse/', label: 'Kurse' },
  { href: '/lernpfade/', label: 'Lernpfade' },
  { href: '/all-access/', label: 'All Access' },
  { href: '/fuer-unternehmen/', label: 'Für Unternehmen' },
  { href: '/ueber-uns/', label: 'Über uns' },
];

/** Preise laut Briefing (netto, nur Geschäftskunden). */
export const preise = {
  einzelkurs: { betrag: 199, laufzeitMonate: 24 },
  allAccess: { betrag: 699, laufzeitMonate: 12 },
};

export const euro = (n: number) => `${n.toLocaleString('de-DE')} €`;

/** Kennzahlen aus der Vorgabe (Briefing 14). VOR LIVEGANG FACHLICH PRÜFEN. Keine weiteren Zahlen ergänzen. */
export const kennzahlen = [
  { wert: '12+', label: 'Kurse bis Ende 2026' },
  { wert: '100 %', label: 'branchenspezialisiert' },
  { wert: '4–7 Min.', label: 'pro Lernstation' },
  { wert: '24 Monate', label: 'Zugriff auf gekaufte Einzelkurse' },
];

/** Freigegebene Referenzlogos. Leer lassen, bis Innoform Logos ausdrücklich freigibt. */
export const referenzen: { name: string; logo: string }[] = [];

export const themen = [
  { slug: 'folien', label: 'Folien' },
  { slug: 'verbunde', label: 'Verbunde' },
  { slug: 'beutel', label: 'Beutel' },
  { slug: 'abpacken', label: 'Abpacken' },
  { slug: 'recycling', label: 'Recycling' },
  { slug: 'nachhaltigkeit', label: 'Nachhaltigkeit' },
];

export const zielgruppen = [
  'Folienherstellung', 'Verpackungsherstellung', 'Markenartikelindustrie', 'Maschinenbau',
  'Rohstoffindustrie', 'Druck', 'Converting', 'Recycling', 'Handel',
];
