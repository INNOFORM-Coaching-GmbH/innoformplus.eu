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
      'Werkstofftechniker und Gründer von Innoform. Seit über 25 Jahren verbindet er Folienherstellung, Verarbeitung und Weiterbildung für die Flexpack-Branche.',
    werdegang: [
      'Nach dem Studium der Werkstofftechnik arbeitete Karsten Schröder rund zehn Jahre in der Produktentwicklung der Bischof + Klein GmbH & Co. KG in Lengerich, zuletzt als Projektleiter.',
      '1998 gründete er die Innoform GmbH, 2000 gemeinsam mit Dipl.-Ing. Klaus Behringer den Innoform Testservice und 2004 mit seiner Frau Kerstin Innoform Coaching. 2010 folgte die Mitgründung der Innoform Consulting GmbH, 2020 das Format inno-talk.de.',
      'Heute moderiert und organisiert er vor allem Tagungen und Firmenveranstaltungen und führt Gespräche mit Akteuren der Branche.',
    ],
    schwerpunkte: [
      'Folienherstellung und -verarbeitung, besonders Standbeutel',
      'Barrierefolien',
      'Spezifikationen',
      'Geschäftsmodelle mit Verpackungen',
    ],
    linkedin: 'https://www.linkedin.com/in/karstenschroeder/',
    web: { href: 'https://www.innoform-coaching.de/', label: 'innoform-coaching.de' },
    profilInnoform: ref('karsten-schroeder'),
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
    schwerpunkte: ['Mechanische Folienprüfung', 'Materialcharakterisierung', 'Migration'],
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
