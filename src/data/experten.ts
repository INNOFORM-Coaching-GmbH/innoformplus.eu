// Expertenprofile. Angaben aus den Referentenprofilen auf innoform-coaching.de (/referenten/<slug>), abgerufen 27.11.2026.
// Nur übernehmen, was dort steht – fehlt etwas (Werdegang, Schwerpunkte), bleibt das Feld leer und die Seite zeigt „folgt“.
// Kurse verweisen über `experten: [slug]` in courses.ts auf diese Profile.

import { courses, type Course } from './courses';

export type Experte = {
  slug: string;
  name: string;
  /** Funktion und Firma wie im Referentenprofil */
  rolle: string;
  firma: string;
  /** Ein Satz für Karten und den Block auf der Kursseite */
  kurzprofil?: string;
  /** Werdegang in Absätzen */
  werdegang?: string[];
  schwerpunkte?: string[];
  lieblingsthemen?: string[];
  /** Porträt unter /public/experten/. Erst eintragen, wenn das Bild freigegeben und abgelegt ist. */
  foto?: string;
  linkedin?: string;
  web?: { href: string; label: string };
  /** Referentenprofil bei Innoform Coaching */
  profilInnoform: string;
};

const ref = (slug: string) => `https://www.innoform-coaching.de/referenten/${slug}`;

export const experten: Experte[] = [
  {
    slug: 'karsten-schroeder',
    name: 'Karsten Schröder',
    rolle: 'Geschäftsführer',
    firma: 'Innoform Coaching GmbH',
    kurzprofil:
      'Werkstofftechniker und Gründer von Innoform. Seit 1998 verbindet er Folienherstellung, Verarbeitung und Weiterbildung für die Flexpack-Branche.',
    werdegang: [
      'Nach dem Studium der Werkstofftechnik arbeitete Karsten Schröder rund zehn Jahre in der Produktentwicklung der Bischof + Klein GmbH & Co. KG in Lengerich, zuletzt als Projektleiter.',
      '1998 gründete er die Innoform GmbH, 2000 gemeinsam mit Dipl.-Ing. Klaus Behringer den Innoform Testservice und 2004 mit seiner Frau Kerstin Innoform Coaching. 2008 initiierte er InnoNET-partners, 2010 gründete er mit Dr. Rainer Brandsch und Klaus Behringer die Innoform Consulting GmbH. 2020 folgte inno-talk.de mit eigenem Podcast.',
      'Heute moderiert und organisiert er vor allem Tagungen und Firmenveranstaltungen.',
    ],
    schwerpunkte: ['Folienherstellung und Verarbeitung (Schwerpunkt Standbeutel)', 'Barrierefolien', 'Spezifikationswesen'],
    lieblingsthemen: ['Geschäftsmodelle mit Verpackungen', 'Moderation und Organisation von Tagungen', 'Interviews mit Branchenteilnehmern'],
    linkedin: 'https://www.linkedin.com/in/karstenschroeder/',
    web: { href: 'https://www.innoform-coaching.de/', label: 'innoform-coaching.de' },
    profilInnoform: ref('karsten-schroeder'),
  },
  {
    slug: 'julian-thielen',
    name: 'Julian Thielen',
    rolle: 'Geschäftsführer',
    firma: 'Innoform Coaching GmbH',
    kurzprofil:
      'Verpackungsingenieur und Experte für recyclinggerechte Verpackungen. Er erklärt technische und regulatorische Themen klar und praxisnah.',
    werdegang: [
      'Julian Thielen ist Verpackungsingenieur und seit 2026 Geschäftsführer der Innoform Coaching GmbH. Zuvor leitete er bei Interzero den Bereich „Made for Recycling“: Er bewertete und optimierte Verpackungen entlang des Recyclingkreislaufs und beriet Markenhersteller und Verpackungsproduzenten.',
      'Seine Themen sind Design for Recycling, Materialauswahl, Sortier- und Verwertungstechnik, die PPWR, Rezyklate und die Zukunft flexibler und faserbasierter Verpackungen.',
      'Bei Innoform Coaching entwickelt er Tagungen, Seminare, Workshops und Lernformate und produziert Inhalte für FlexPack.News, Inno-Talk, Podcasts und Newsletter.',
    ],
    lieblingsthemen: [
      'Recyclingfähigkeit und nachhaltige Verpackungen',
      'Flexible Verpackungen, Materialien und PPWR',
      'Technische Themen einfach und mit Freude erklären',
      'Podcasts, Videos und neue Content-Formate',
    ],
    linkedin: 'https://www.linkedin.com/in/julianthielen/',
    web: { href: 'https://www.innoform-coaching.de/', label: 'innoform-coaching.de' },
    profilInnoform: ref('julian-thielen'),
  },
  {
    slug: 'heiko-schenck',
    name: 'Dr. Heiko Schenck',
    rolle: 'Mitinhaber',
    firma: 'Projectif Isolde Freese & Heiko Schenck GbR',
    kurzprofil: 'Berät mit Projectif zu flexiblen Verpackungen und Polymer-Extrusion – nach vielen Jahren bei DuPont und Dow.',
    werdegang: [
      'Heiko Schenck berät mit Projectif zu flexiblen Verpackungen und Polymer-Extrusion.',
      'Zuvor war er bei DuPont Account Manager für Unilever und Kraft, Manager Application Development für Frischeverpackungen und Senior Market Development Manager ECEMEA für die Zusammenarbeit mit Extrusionsmaschinenbauern. Bis Ende 2021 verantwortete er als Senior Marketing Manager bei Dow weltweit die Extrusions-OEMs.',
    ],
    schwerpunkte: [
      'Schulungen zu Polymeren und ihren Anwendungen in flexiblen Verpackungen',
      'Polymer-Extrusion und Extrusionsverfahren',
      'Anwendungsentwicklung mit Schwerpunkt Nachhaltigkeit',
      'Investitionsprojekte Extrusionsmaschinen',
      'Polymermischungen wie Haftvermittler und Peel',
    ],
    lieblingsthemen: ['Internationale Zusammenarbeit', 'Nachhaltigkeit und Gewichtsreduzierung', 'Vermeidung von Lebensmittelabfällen', 'Umweltschutz fängt bei uns an'],
    linkedin: 'https://www.linkedin.com/in/heiko-schenck-3b653867/',
    web: { href: 'https://www.projectif.de', label: 'projectif.de' },
    profilInnoform: ref('heiko-schenck'),
  },
  {
    slug: 'christian-lutze',
    name: 'Christian Lutze',
    rolle: 'Entwicklungsleiter Spezialpapiere',
    firma: 'KÄMMERER Spezialpapiere GmbH',
    kurzprofil: 'Entwickelt bei KÄMMERER Barriere- und Verpackungspapiere – vom Coating bis zur Rezyklierbarkeit.',
    werdegang: [
      'Christian Lutze begann 2002 als Chemikant und schloss 2010 das Studium zum Chemietechniker ab. In Forschung und Entwicklung bei KÄMMERER arbeitete er an Selbstdurchschreibe- und Inkjetpapieren und leitete ab 2018 Projekte für Barriere- und Verpackungspapiere.',
      'Von 2023 bis 2025 war er R&D Manager für Barriere- und Verpackungspapiere, seit 2025 ist er Entwicklungsleiter Spezialpapiere.',
    ],
    schwerpunkte: ['Forschung und Entwicklung', 'Produktion', 'Coating'],
    lieblingsthemen: ['Barriere', 'Coating', 'Qualitäts- und Kostenoptimierung', 'Rezyklierbarkeit', 'Biologische Abbaubarkeit'],
    linkedin: 'https://www.linkedin.com/in/christian-lutze-09158826b/',
    web: { href: 'https://www.kaemmerer-paper.com', label: 'kaemmerer-paper.com' },
    profilInnoform: ref('christian-lutze'),
  },
  {
    slug: 'daniel-wachtendorf',
    name: 'Dr. Daniel Wachtendorf',
    rolle: 'Technischer Leiter',
    firma: 'Innoform GmbH',
    kurzprofil: 'Promovierter Chemiker im Innoform Testservice – Fachmann für Folienprüfung, Materialcharakterisierung und Migration.',
    werdegang: [
      'Daniel Wachtendorf wurde an der Carl von Ossietzky Universität Oldenburg in Chemie promoviert und arbeitet im Innoform Testservice.',
    ],
    schwerpunkte: ['Mechanische Prüfungen an Folien', 'Materialcharakterisierung', 'Migration'],
    web: { href: 'https://www.innoform-testservice.de', label: 'innoform-testservice.de' },
    profilInnoform: ref('daniel-wachtendorf'),
  },
  {
    slug: 'henry-drut',
    name: 'Dr. Henry Drut',
    rolle: 'Geschäftsführer und Inhaber',
    firma: 'FormerFab® GmbH',
    kurzprofil: 'Inhaber der FormerFab GmbH. Er berechnet und entwickelt Formschultern für Form-, Füll- und Verschließmaschinen.',
    schwerpunkte: ['Berechnung und Entwicklung von Formschultern'],
    linkedin: 'https://www.linkedin.com/in/henry-drut-53603167/',
    web: { href: 'https://www.former-fab.de', label: 'former-fab.de' },
    profilInnoform: ref('henry-drut'),
  },
  {
    slug: 'tobias-nitsche',
    name: 'Tobias Nitsche',
    rolle: 'FormerFab® GmbH',
    firma: 'FormerFab® GmbH',
    web: { href: 'https://www.former-fab.de', label: 'former-fab.de' },
    profilInnoform: ref('tobias-nitsche'),
  },
];

export const getExperte = (slug: string) => experten.find((e) => e.slug === slug);
/** Funktion und Firma in einer Zeile, ohne Dopplung (Tobias Nitsche hat nur die Firma) */
export const rolleText = (e: Experte) => (e.rolle === e.firma ? e.firma : `${e.rolle}, ${e.firma}`);

/** Experten eines Kurses in der Reihenfolge aus courses.ts */
export const expertenVon = (c: Course) => (c.experten ?? []).map(getExperte).filter((e): e is Experte => !!e);
/** Kurse auf Innoform Plus, die ein Experte verantwortet */
export const kurseVon = (slug: string) => courses.filter((c) => c.experten?.includes(slug));
export const initialen = (e: Experte) =>
  e.name.replace(/^Dr\.\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
