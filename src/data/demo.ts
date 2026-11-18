// BEISPIELDATEN für Dashboard und Lernansicht (Vorschau). Echte Fortschritte kommen später aus E2G.
import type { Frage } from '@/components/KnowledgeCheck';

export const demoFortschritt = { kurs: 'abpacken-teil-a', fertigBis: 6 };

/** Beispielfrage aus der Vorgabe (Briefing Abschnitt 22). */
export const demoFrage: Frage = {
  frage: 'Welche Eigenschaft beeinflusst die Sauerstoffbarriere primär?',
  antworten: ['PE', 'EVOH', 'PP', 'EVA'],
  richtig: 1,
  erklaerung: 'EVOH (Ethylen-Vinylalkohol-Copolymer) ist in Verbunden die typische Sauerstoffbarriereschicht. PE, PP und EVA sperren Sauerstoff deutlich schlechter und übernehmen andere Aufgaben, etwa Siegeln oder Feuchtigkeitsschutz.',
};
