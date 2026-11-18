'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FormField, Select, Checkbox } from '@/components/Form';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Feedback';
import { e2g } from '@/data/site';
import s from './unternehmen.module.css';

type Fehler = Partial<Record<string, string>>;

/** Firmenanfrage (Briefing Abschnitt 12). Versand an CRM/Vertrieb ist noch nicht angebunden – der Dialog sagt das offen. */
export function Anfrage() {
  const [fehler, setFehler] = useState<Fehler>({});
  const [senden, setSenden] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [versuch, setVersuch] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Nach einem fehlgeschlagenen Absenden das erste fehlerhafte Feld fokussieren (nach dem Rendern der Meldungen)
  useEffect(() => {
    if (versuch) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [versuch]);

  const absenden = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const neu: Fehler = {};
    const pflicht: [string, string][] = [
      ['vorname', 'Bitte geben Sie Ihren Vornamen an.'],
      ['nachname', 'Bitte geben Sie Ihren Nachnamen an.'],
      ['email', 'Bitte geben Sie Ihre geschäftliche E-Mail-Adresse an.'],
      ['unternehmen', 'Bitte geben Sie Ihr Unternehmen an.'],
      ['land', 'Bitte geben Sie das Land an.'],
      ['lernende', 'Bitte wählen Sie die ungefähre Zahl der Lernenden.'],
    ];
    pflicht.forEach(([k, m]) => { if (!String(f.get(k) ?? '').trim()) neu[k] = m; });
    const mail = String(f.get('email') ?? '');
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) neu.email = 'Bitte prüfen Sie die E-Mail-Adresse, z. B. name@unternehmen.de.';
    if (!f.get('datenschutz')) neu.datenschutz = 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.';
    setFehler(neu);
    if (Object.keys(neu).length) {
      setVersuch((v) => v + 1);
      return;
    }
    setSenden(true);
    setTimeout(() => { setSenden(false); setFertig(true); }, 600);
  };

  return (
    <>
      <form ref={formRef} className={s.form} onSubmit={absenden} noValidate>
        {Object.keys(fehler).length > 0 && (
          <p className={s.fehlerSumme} role="alert">Bitte prüfen Sie die markierten Felder ({Object.keys(fehler).length}).</p>
        )}
        <div className={s.zweier}>
          <FormField name="vorname" label="Vorname" autoComplete="given-name" pflicht fehler={fehler.vorname} />
          <FormField name="nachname" label="Nachname" autoComplete="family-name" pflicht fehler={fehler.nachname} />
        </div>
        <FormField name="email" type="email" label="Geschäftliche E-Mail" autoComplete="email" pflicht fehler={fehler.email} />
        <div className={s.zweier}>
          <FormField name="unternehmen" label="Unternehmen" autoComplete="organization" pflicht fehler={fehler.unternehmen} />
          <FormField name="funktion" label="Funktion / Abteilung" autoComplete="organization-title" />
        </div>
        <div className={s.zweier}>
          <FormField name="land" label="Land" autoComplete="country-name" pflicht fehler={fehler.land} />
          <Select name="lernende" label="Geschätzte Zahl der Lernenden" pflicht fehler={fehler.lernende} optionen={['bis 5', '6–20', '21–50', '51–200', 'mehr als 200']} />
        </div>
        <div className={s.zweier}>
          <Select name="standorte" label="Anzahl Standorte" optionen={['1', '2–5', 'mehr als 5']} />
          <FormField name="sprachen" label="Benötigte Sprachen" hinweis="z. B. Deutsch, Englisch" />
        </div>
        <FormField name="themen" label="Interessante Themen oder Kurse" />
        <FormField name="bedarf" label="Ihr Weiterbildungsbedarf" mehrzeilig />
        <Checkbox
          name="datenschutz"
          fehler={fehler.datenschutz}
          label={<>Ich bin einverstanden, dass Innoform meine Angaben zur Bearbeitung der Anfrage verwendet. Details in der <a href={e2g.datenschutz}>Datenschutzerklärung</a>. *</>}
        />
        <p className="small muted">* Pflichtfeld</p>
        <div>
          <Button type="submit" loading={senden} arrow>Unternehmenslösung anfragen</Button>
        </div>
      </form>
      <Modal
        offen={fertig}
        onClose={() => setFertig(false)}
        titel="Vielen Dank für Ihre Anfrage."
        aktionen={<Button onClick={() => setFertig(false)}>Schließen</Button>}
      >
        <p>Vorschau: Der Versand dieses Formulars ist noch nicht angebunden. Ihre Angaben wurden nicht übermittelt.</p>
        <p>
          Bitte nutzen Sie bis dahin unser <a href={e2g.kontakt}>Kontaktformular auf innoform-coaching.de</a>.
        </p>
      </Modal>
    </>
  );
}
