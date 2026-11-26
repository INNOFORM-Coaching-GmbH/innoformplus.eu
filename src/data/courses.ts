// Kursdaten. Nur „Abpacken Teil A“ beruht auf echten Angaben (Etappen und Stationen aus dem Übergabepaket vom 18.11.2026).
// Alles mit `platzhalter: true` oder fehlenden Feldern ist Beispiel-/Entwicklungsdaten und wird auf der Seite so gekennzeichnet.
// NICHTS ergänzen, was nicht von Innoform geliefert wurde (Experten, Bewertungen, Teilnehmerzahlen …).

export type Station = { nr: number; titel: string; minuten: number; vorschau?: boolean };
export type Etappe = { titel: string; stationen: Station[] };

export type Course = {
  slug: string;
  titel: string;
  kurzbeschreibung: string;
  thema: string; // slug aus themen
  schlagworte: string[];
  sprache: string;
  /** Badge über der Karte, z. B. „Neu“. Nur setzen, wenn die Aussage stimmt. */
  badge?: string;
  level?: string;
  experte?: { name: string; rolle: string; profil?: string };
  lernziele?: string[];
  zielgruppe?: string[];
  etappen: Etappe[];
  /** Anzahl Stationen, wenn die Etappen noch nicht vorliegen */
  stationenAnzahl?: number;
  /** Dauer in Minuten, wenn sie nicht aus den Stationen folgt */
  dauerMinuten?: number;
  /** Nur setzen, wenn der Kauf in E2G für genau diesen Kurs funktioniert (participate.php führt sonst auf die Veranstaltungsliste). */
  e2gEventId?: number;
  platzhalter?: boolean;
  /** „in-produktion“: Kurs wird noch produziert – kein Kauf, stattdessen „Vormerken“. */
  status?: 'in-produktion';
};

const abpackenEtappen: Etappe[] = [
  ['Die Maschine', [['Worum es in diesem Kurs geht', 3], ['Wo die Folie die Maschine berührt', 7], ['Die Formschulter richtig auslegen', 3], ['Probleme an der Formschulter erkennen', 3], ['Beutelformen und Mehrfachanlagen', 3], ['Füllrohr und typische Füllgüter', 5], ['Vertikal oder horizontal?', 2]]],
  ['Abzug und Reibung', [['Zangenabzug: Vorsicht bei Monomaterial', 2], ['Bandabzug: außen haften, innen gleiten', 5], ['Haftreibung und Gleitreibung messen', 5], ['Folie gegen Metall: Fehlerquellen', 4]]],
  ['Gleitmittel', [['Von Ölsäureamid zu Erucasäureamid', 3], ['Wie Gleitmittel wandert', 4], ['Gleitmittel dosieren und Antiblockmittel', 6]]],
  ['Siegeln und Beutel', [['Längsnaht: Lap Seal oder Fin Seal', 4], ['Siegelbacken: glatt, gerillt oder Waffel?', 3], ['Trennmesser und Duplex-Anlagen', 3], ['Abzugssysteme in der Praxis, Zipper und Formate', 5]]],
  ['Dosieren', [['Volumendosierer und verschmutzte Siegelnähte', 2], ['Schneckendosierer für Pulver', 3]]],
].reduce<{ etappen: Etappe[]; nr: number }>(
  (acc, [titel, st]) => {
    const stationen = (st as [string, number][]).map(([t, m]) => {
      acc.nr += 1;
      return { nr: acc.nr, titel: t, minuten: m, vorschau: acc.nr <= 3 };
    });
    acc.etappen.push({ titel: titel as string, stationen });
    return acc;
  },
  { etappen: [], nr: 0 },
).etappen;

const ZG_ABPACKEN = ['Produktion', 'Entwicklung', 'Verpackungstechnik', 'Qualitätssicherung', 'Einkauf', 'Vertrieb'].map((b) => `Mitarbeitende aus ${b}`);

export const courses: Course[] = [
  {
    // Pilotkurs (Entscheidung Julian 26.11.2026). Inhalte folgen, wenn der Kurs produziert ist.
    slug: 'nachhaltigkeit-im-flexpack',
    titel: 'Nachhaltigkeit im FlexPack',
    kurzbeschreibung: 'Der Pilotkurs von Innoform Plus. Er wird derzeit produziert – merken Sie ihn vor, dann informieren wir Sie zum Start.',
    thema: 'nachhaltigkeit',
    schlagworte: ['Nachhaltigkeit', 'Flexible Verpackungen'],
    sprache: 'Deutsch',
    badge: 'Pilotkurs',
    etappen: [],
    status: 'in-produktion',
  },
  {
    slug: 'abpacken-teil-a',
    titel: 'Abpacken Teil A',
    // Texte aus E2G (Event 2276, Code APav), übernommen 26.11.2026
    kurzbeschreibung:
      'Die wesentlichen Abfüllverfahren für Folienverpackungen am Beispiel von Lebensmitteln: Ausgehend von der Folienrolle geht es um vertikale Form-, Füll- und Verschließsysteme (v-FFS). Im Fokus steht das Wechselspiel von Material und Maschine.',
    level: 'Stufe 1 – keine Vorkenntnisse erforderlich',
    zielgruppe: ZG_ABPACKEN,
    thema: 'abpacken',
    schlagworte: ['Maschine', 'Reibung', 'Siegeln'],
    sprache: 'Deutsch',
    badge: 'Neu',
    // Experte laut Julian (26.11.2026); Rolle wie auf innoform-coaching.de. Kurzprofil folgt.
    experte: { name: 'Karsten Schröder', rolle: 'Geschäftsführer, Innoform Coaching GmbH' },
    etappen: abpackenEtappen,
    // E2G-Event 2276 (Videokurs „Abpacken in flexiblen Verpackungen – Teil A“, Angabe Julian 26.11.2026). 2268 ist „Kunststoffe für Folien“.
    e2gEventId: 2276,
  },
  {
    // E2G-Webseminar 1219 (APb-06-20w), Texte übernommen 26.11.2026. Innoform-Plus-Event folgt.
    slug: 'abpacken-teil-b',
    titel: 'Abpacken Teil B: Thermoformen und Tiefziehen',
    kurzbeschreibung:
      'Marmeladen-Portion, Käsetray, Salami oder frische Pizza: Was Folienhersteller und Abpacker über das Thermoformen wissen müssen, welche Tücken die Materialien haben und was man wofür nimmt – mit Praxistipps für Abpack- und Entwicklungsprozess.',
    thema: 'abpacken',
    schlagworte: ['Thermoformen', 'Tiefziehen', 'Lebensmittel'],
    sprache: 'Deutsch',
    level: 'Stufe 1 – keine Vorkenntnisse erforderlich',
    experte: { name: 'Karsten Schröder', rolle: 'Geschäftsführer, Innoform Coaching GmbH' },
    zielgruppe: ZG_ABPACKEN,
    etappen: [],
  },
  {
    // E2G-Webseminar 2150 (WRa-09-26), Texte übernommen 26.11.2026. Innoform-Plus-Event folgt.
    slug: 'ppwr-flexpack-recyclingfaehigkeit',
    titel: 'PPWR und Flexpack A: Recyclingfähigkeit bis 2030',
    kurzbeschreibung:
      'Die EU-Verpackungsverordnung PPWR im Überblick und praxisnahe Wege, Folienverpackungen bis 2030 wirtschaftlich sinnvoll recyclingfähig zu gestalten: Anforderungen, Materialauswahl, Design und Beispiele aus der Industrie.',
    thema: 'recycling',
    schlagworte: ['PPWR', 'Recyclingfähigkeit', 'Design'],
    sprache: 'Deutsch',
    level: 'Stufe 2 – Vorkenntnisse hilfreich, aber nicht Voraussetzung',
    experte: { name: 'Dr. Daniel Wachtendorf', rolle: 'Technischer Leiter, Innoform GmbH' },
    lernziele: [
      'Die neuen gesetzlichen Anforderungen der PPWR verstehen',
      'Strategien zur Anpassung der Produktionsprozesse entwickeln',
      'Verständnis und Zusammenarbeit innerhalb der Branche fördern',
    ],
    zielgruppe: [
      'Verpackungshersteller, insbesondere Hersteller von Folienverpackungen',
      'Produktdesigner und Ingenieure, die recyclingfähige Verpackungen gestalten und entwickeln',
    ],
    etappen: [],
  },
  {
    // E2G-Webseminar 2222 (PAa-03-27), Texte übernommen 26.11.2026. Innoform-Plus-Event folgt.
    slug: 'papier-mit-barriere',
    titel: 'Flexpack aus Papier mit Barriere',
    kurzbeschreibung:
      'Welche Barrieren für Lebensmittelverpackungen mit Papier heute möglich sind, wie sie sich unterscheiden und welche Beschichtungen man besser vermeidet – mit Wasserdampf- und Sauerstoffbarrieren handelsüblicher Papiere und Anwendungsbeispielen.',
    thema: 'papier',
    schlagworte: ['Papier', 'Barriere', 'Beschichtung'],
    sprache: 'Deutsch',
    level: 'Stufe 2 – Vorkenntnisse hilfreich, aber nicht Voraussetzung',
    zielgruppe: ['Alle, die Papierverpackungen für flexible Verpackungen entwickeln, einsetzen oder sich damit beschäftigen'],
    etappen: [],
  },
  {
    // E2G-Webseminar 2187 (PAb-03-27), Texte übernommen 26.11.2026. Innoform-Plus-Event folgt.
    slug: 'papier-und-folien-auf-ffs',
    titel: 'Papier und Folien auf FFS-Anlagen fehlerfrei verarbeiten',
    kurzbeschreibung:
      'Papier und Folien auf Form-, Füll- und Verschließmaschinen: Formschulter gestalten und einstellen, Bahnführung und -regelung, Fehler diagnostizieren und typische Stolperfallen vermeiden.',
    thema: 'abpacken',
    schlagworte: ['FFS', 'Formschulter', 'Papier'],
    sprache: 'Deutsch',
    level: 'Stufe 2 – Vorkenntnisse hilfreich, aber nicht Voraussetzung',
    experte: { name: 'Dr. Henry Drut und Tobias Nitsche', rolle: 'FormerFab® GmbH' },
    zielgruppe: ['Alle, die Produkte auf FFS-Maschinen verpacken, Material dafür liefern oder mehr über Flexpack wissen möchten'],
    etappen: [],
  },
  {
    slug: 'folienverbunde',
    titel: 'Aufbau und Eigenschaften von Folienverbunden',
    kurzbeschreibung: 'Materialien, Funktionen und Design für optimale Performance.',
    thema: 'verbunde',
    schlagworte: ['Materialien', 'Verbunde', 'Design'],
    sprache: 'Deutsch',
    etappen: [],
    stationenAnzahl: 28,
    dauerMinuten: 105,
    platzhalter: true,
  },
  {
    slug: 'kunststoffe-fuer-folien',
    titel: 'Kunststoffe für Folien',
    kurzbeschreibung: 'Welche Kunststoffe in Folien und flexiblen Verpackungen stecken – und was daraus für Verarbeitung und Eigenschaften folgt.',
    thema: 'folien',
    schlagworte: ['Polymere', 'Eigenschaften', 'Verarbeitung'],
    sprache: 'Deutsch',
    etappen: [],
    stationenAnzahl: 21,
    // E2G-Event 2268 (innoform_co lernpfad_plattform_kurse). Kauf erst eintragen, wenn participate.php live zum Kurs führt.
    platzhalter: true,
  },
];

export const kaufbar = (c: Course) => !!c.e2gEventId && c.status !== 'in-produktion';

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const stationen = (c: Course) => c.etappen.flatMap((e) => e.stationen);
export const stationenAnzahl = (c: Course) => (c.etappen.length ? stationen(c).length : c.stationenAnzahl);
export const dauerMinuten = (c: Course) =>
  c.etappen.length ? stationen(c).reduce((s, x) => s + x.minuten, 0) : c.dauerMinuten;

export const dauerText = (min?: number) => {
  if (!min) return undefined;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h} h ${m ? `${m} min` : ''}`.trim() : `${m} min`;
};
