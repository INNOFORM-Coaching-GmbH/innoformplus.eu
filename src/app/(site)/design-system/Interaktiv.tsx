'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/Button';
import { Modal, Toast, ErrorState } from '@/components/Feedback';
import { FormField, Select, Checkbox, RadioGroup } from '@/components/Form';
import { Tabs } from '@/components/Disclosure';

export function Interaktiv() {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const zu = useCallback(() => setToast(null), []);
  return (
    <div className="stack-4">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <Button variant="secondary" onClick={() => setModal(true)}>Modal öffnen</Button>
        <Button variant="secondary" onClick={() => setToast('Ihre Änderungen wurden gespeichert.')}>Toast zeigen</Button>
      </div>
      <Modal offen={modal} onClose={() => setModal(false)} titel="Beispiel-Dialog" aktionen={<><Button variant="secondary" onClick={() => setModal(false)}>Abbrechen</Button><Button onClick={() => setModal(false)}>Bestätigen</Button></>}>
        <p>Dialoge bündeln eine Entscheidung. Escape schließt, der Fokus bleibt im Dialog.</p>
      </Modal>
      <Toast meldung={toast} ton="erfolg" onClose={zu} />

      <div style={{ display: 'grid', gap: 'var(--space-3)', maxWidth: 640 }}>
        <FormField label="Geschäftliche E-Mail" type="email" pflicht hinweis="Wir nutzen sie nur für Ihre Anfrage." />
        <FormField label="Unternehmen" pflicht fehler="Bitte geben Sie Ihr Unternehmen an." />
        <FormField label="Deaktiviert" disabled defaultValue="Nicht änderbar" />
        <Select label="Anzahl Standorte" optionen={['1', '2–5', 'mehr als 5']} />
        <RadioGroup legend="Sprache" name="ds-sprache" optionen={['Deutsch', 'Englisch']} />
        <Checkbox label="Ich stimme der Verarbeitung meiner Angaben zu." />
      </div>

      <Tabs label="Beispiel-Reiter" tabs={[{ id: 'a', label: 'Übersicht', inhalt: <p>Inhalt des ersten Reiters.</p> }, { id: 'b', label: 'Details', inhalt: <p>Inhalt des zweiten Reiters.</p> }, { id: 'c', label: 'Fragen', inhalt: <p>Inhalt des dritten Reiters.</p> }]} />

      <ErrorState text="Der Kurs konnte nicht geladen werden. Bitte versuchen Sie es erneut." onRetry={() => setToast('Erneuter Versuch gestartet.')} />
    </div>
  );
}
