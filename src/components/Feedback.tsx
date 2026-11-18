'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, Search as SearchIcon, X } from 'lucide-react';
import { Button } from './Button';
import s from './Feedback.module.css';

/** Modaler Dialog auf Basis von <dialog>: Fokusfalle, Escape und Hintergrund-Sperre liefert der Browser. */
export function Modal({ offen, onClose, titel, children, aktionen }: { offen: boolean; onClose: () => void; titel: string; children: ReactNode; aktionen?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (offen && !d.open) d.showModal();
    if (!offen && d.open) d.close();
  }, [offen]);
  return (
    <dialog ref={ref} className={s.modal} aria-labelledby="modal-titel" onClose={onClose} onCancel={onClose}>
      <div className={s.modalKopf}>
        <h2 id="modal-titel" className="h3">{titel}</h2>
        <button type="button" className={s.schliessen} onClick={onClose} aria-label="Dialog schließen">
          <X size={22} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
      <div className={s.modalInhalt}>{children}</div>
      {aktionen && <div className={s.modalAktionen}>{aktionen}</div>}
    </dialog>
  );
}

/** Kurze Statusmeldung unten rechts, wird vorgelesen (role=status). */
export function Toast({ meldung, ton = 'info', onClose }: { meldung: string | null; ton?: 'info' | 'erfolg' | 'fehler'; onClose: () => void }) {
  useEffect(() => {
    if (!meldung) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [meldung, onClose]);
  const Icon = ton === 'erfolg' ? CheckCircle2 : ton === 'fehler' ? AlertTriangle : Info;
  return (
    <div className={s.toastBereich} role="status" aria-live="polite">
      {meldung && (
        <div className={`${s.toast} ${s[ton]}`}>
          <Icon size={20} strokeWidth={2} aria-hidden />
          <p>{meldung}</p>
          <button type="button" className={s.schliessen} onClick={onClose} aria-label="Meldung schließen">
            <X size={18} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

export function Search({ wert, onChange, label = 'Suche', platzhalter = 'Kurse und Themen durchsuchen', id = 'suche' }: { wert: string; onChange: (v: string) => void; label?: string; platzhalter?: string; id?: string }) {
  return (
    <div className={s.suche} role="search">
      <label htmlFor={id} className="visually-hidden">{label}</label>
      <SearchIcon className={s.sucheIcon} size={20} strokeWidth={1.75} aria-hidden />
      <input id={id} type="search" className={s.sucheFeld} placeholder={platzhalter} value={wert} onChange={(e) => onChange(e.target.value)} autoComplete="off" />
    </div>
  );
}

export function ErrorState({ titel = 'Das hat nicht geklappt.', text, onRetry }: { titel?: string; text?: ReactNode; onRetry?: () => void }) {
  return (
    <div className={`${s.zustand} ${s.fehlerZustand}`} role="alert">
      <AlertTriangle size={32} strokeWidth={1.5} aria-hidden />
      <h2 className="h3">{titel}</h2>
      {text && <p className="muted">{text}</p>}
      {onRetry && <Button variant="secondary" onClick={onRetry}>Erneut versuchen</Button>}
    </div>
  );
}

