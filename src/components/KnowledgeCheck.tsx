'use client';

import { useId, useState, type ReactNode } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './Button';
import s from './KnowledgeCheck.module.css';

export type Frage = { frage: string; antworten: string[]; richtig: number; erklaerung: ReactNode };

/** Wissenscheck zur Selbstkontrolle: nichts wird gespeichert oder bewertet. Richtig/falsch immer mit Text und Symbol, nie nur über Farbe. */
export function KnowledgeCheck({ frage }: { frage: Frage }) {
  const [gewaehlt, setGewaehlt] = useState<number | null>(null);
  const [geprueft, setGeprueft] = useState(false);
  const [hinweis, setHinweis] = useState(false);
  const id = useId();
  const pruefen = () => {
    if (gewaehlt === null) { setHinweis(true); return; }
    setGeprueft(true);
  };
  return (
    <section className={s.check} aria-labelledby={`${id}-titel`}>
      <p className="eyebrow" id={`${id}-titel`}>Wissenscheck</p>
      <Question id={`${id}-frage`}>{frage.frage}</Question>
      <div role="radiogroup" aria-labelledby={`${id}-frage`} className={s.optionen}>
        {frage.antworten.map((a, i) => (
          <AnswerOption
            key={a}
            name={id}
            label={a}
            gewaehlt={gewaehlt === i}
            ergebnis={geprueft ? (i === frage.richtig ? 'richtig' : gewaehlt === i ? 'falsch' : undefined) : undefined}
            gesperrt={geprueft}
            onSelect={() => { setGewaehlt(i); setHinweis(false); }}
          />
        ))}
      </div>
      {hinweis && <p className={s.hinweis} role="alert">Bitte wählen Sie zuerst eine Antwort.</p>}
      {!geprueft ? (
        <Button variant="secondary" onClick={pruefen}>Antwort prüfen</Button>
      ) : (
        <>
          <Feedback richtig={gewaehlt === frage.richtig} loesung={frage.antworten[frage.richtig]}>{frage.erklaerung}</Feedback>
          <Button variant="text" onClick={() => { setGeprueft(false); setGewaehlt(null); }}>Noch einmal versuchen</Button>
        </>
      )}
      <p className={s.fuss}>Selbstkontrolle – Ihre Antwort wird weder gespeichert noch bewertet.</p>
    </section>
  );
}

export function Question({ id, children }: { id: string; children: ReactNode }) {
  return <h3 id={id} className={s.frage}>{children}</h3>;
}

export function AnswerOption({ name, label, gewaehlt, ergebnis, gesperrt, onSelect }: {
  name: string; label: string; gewaehlt: boolean; ergebnis?: 'richtig' | 'falsch'; gesperrt: boolean; onSelect: () => void;
}) {
  return (
    <label className={`${s.option} ${gewaehlt ? s.gewaehlt : ''} ${ergebnis ? s[ergebnis] : ''}`}>
      <input type="radio" name={name} checked={gewaehlt} disabled={gesperrt} onChange={onSelect} className={s.radio} />
      <span className={s.optionText}>{label}</span>
      {ergebnis === 'richtig' && <span className={s.tag}><CheckCircle2 size={18} strokeWidth={2} aria-hidden /> Richtige Antwort</span>}
      {ergebnis === 'falsch' && <span className={s.tag}><XCircle size={18} strokeWidth={2} aria-hidden /> Ihre Antwort</span>}
    </label>
  );
}

export function Feedback({ richtig, loesung, children }: { richtig: boolean; loesung: string; children: ReactNode }) {
  return (
    <div className={`${s.feedback} ${richtig ? s.fbRichtig : s.fbFalsch}`} role="status">
      <p className={s.fbTitel}>
        {richtig ? <CheckCircle2 size={22} strokeWidth={2} aria-hidden /> : <XCircle size={22} strokeWidth={2} aria-hidden />}
        {richtig ? 'Richtig.' : `Nicht ganz. Richtig ist: ${loesung}.`}
      </p>
      <div className={s.fbText}>{children}</div>
    </div>
  );
}
