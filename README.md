# innoformplus.eu

Website und UI-System von **Innoform Plus** – Next.js (App Router, TypeScript, CSS Modules), statisch exportiert und über GitHub Pages
ausgeliefert (eigene Domain `www.innoformplus.eu`, siehe `public/CNAME`). Kauf, Konto und Lernen laufen vorerst in E2G (innoform-coaching.de).

```
npm install
npm run dev      # http://localhost:3000
npm run build    # statischer Export nach out/
```

## Aufbau

- `src/styles/tokens.css` – **alle** Design-Tokens (Farben der Innoform CI, Typografie, Abstände, Radien). Neue Werte nur hier.
- `src/components/` – Komponenten (Header, Hero, BrandDevice, Button, CourseCard, PricingCard, KnowledgeCheck, Formulare, Modal, Toast …).
  Übersicht aller Komponenten und Zustände: `/design-system/` (nicht indexiert).
- `src/app/(site)/` – Website-Seiten mit Kopf und Fuß; `src/app/lernen/` – Lernansicht mit schlankem Kopf.
- `src/data/` – Inhalte: `site.ts` (Navigation, Preise, Kennzahlen, Links nach E2G), `courses.ts` (Kurse), `demo.ts` (Beispieldaten).

## Inhaltsregeln

- Nichts erfinden: keine Kunden, Logos, Testimonials, Experten, Bewertungen oder Zahlen, die Innoform nicht geliefert hat.
- Fehlende Inhalte sind sichtbar als **Platzhalter** gekennzeichnet (`platzhalter: true`, `<PlaceholderNote />`).
- Referenzlogos erscheinen erst, wenn sie in `site.ts → referenzen` eingetragen und freigegeben sind.
- Kennzahlen in `site.ts → kennzahlen` vor dem Start fachlich prüfen.

## Vorabversion

`site.preLaunch = true` setzt `noindex` auf allen Seiten, `public/robots.txt` sperrt Suchmaschinen. Zum Start beides umstellen.
Login, Dashboard, Lernansicht und Suche bleiben immer `noindex`.

## Veröffentlichen

Push auf `main` → Workflow „Pages“ baut und veröffentlicht (Settings → Pages → Source: GitHub Actions). PRs werden nur gebaut.
