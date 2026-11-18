'use client';

import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import s from './Form.module.css';

type Base = { label: string; hinweis?: string; fehler?: string; pflicht?: boolean };

function Rahmen({ id, label, hinweis, fehler, pflicht, children }: Base & { id: string; children: ReactNode }) {
  return (
    <div className={`${s.feld} ${fehler ? s.hatFehler : ''}`}>
      <label htmlFor={id} className={s.label}>
        {label}
        {pflicht && <span className={s.pflicht} aria-hidden> *</span>}
      </label>
      {hinweis && <p id={`${id}-hinweis`} className={s.hinweis}>{hinweis}</p>}
      {children}
      {fehler && (
        <p id={`${id}-fehler`} className={s.fehler}>
          <AlertCircle size={16} strokeWidth={2} aria-hidden /> {fehler}
        </p>
      )}
    </div>
  );
}

const beschrieben = (id: string, hinweis?: string, fehler?: string) =>
  [hinweis ? `${id}-hinweis` : '', fehler ? `${id}-fehler` : ''].filter(Boolean).join(' ') || undefined;

export function FormField({ label, hinweis, fehler, pflicht, mehrzeilig, ...rest }: Base & { mehrzeilig?: boolean } & InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const gemeinsam = {
    id,
    className: s.input,
    required: pflicht,
    'aria-invalid': fehler ? true : undefined,
    'aria-describedby': beschrieben(id, hinweis, fehler),
  };
  return (
    <Rahmen id={id} label={label} hinweis={hinweis} fehler={fehler} pflicht={pflicht}>
      {mehrzeilig ? (
        <textarea {...gemeinsam} rows={5} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...gemeinsam} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </Rahmen>
  );
}

export function Select({ label, hinweis, fehler, pflicht, optionen, platzhalter = 'Bitte wählen', ...rest }: Base & { optionen: string[]; platzhalter?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Rahmen id={id} label={label} hinweis={hinweis} fehler={fehler} pflicht={pflicht}>
      <select
        id={id}
        className={`${s.input} ${s.select}`}
        required={pflicht}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={beschrieben(id, hinweis, fehler)}
        defaultValue=""
        {...rest}
      >
        <option value="" disabled>{platzhalter}</option>
        {optionen.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </Rahmen>
  );
}

export function Checkbox({ label, fehler, ...rest }: { label: ReactNode; fehler?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={`${s.wahl} ${fehler ? s.hatFehler : ''}`}>
      <input id={id} type="checkbox" className={s.box} aria-invalid={fehler ? true : undefined} aria-describedby={fehler ? `${id}-fehler` : undefined} {...rest} />
      <label htmlFor={id}>{label}</label>
      {fehler && (
        <p id={`${id}-fehler`} className={`${s.fehler} ${s.wahlFehler}`}>
          <AlertCircle size={16} strokeWidth={2} aria-hidden /> {fehler}
        </p>
      )}
    </div>
  );
}

export function RadioGroup({ legend, name, optionen, fehler, pflicht }: { legend: string; name: string; optionen: string[]; fehler?: string; pflicht?: boolean }) {
  const id = useId();
  return (
    <fieldset className={`${s.gruppe} ${fehler ? s.hatFehler : ''}`} aria-describedby={fehler ? `${id}-fehler` : undefined}>
      <legend className={s.label}>
        {legend}
        {pflicht && <span className={s.pflicht} aria-hidden> *</span>}
      </legend>
      {optionen.map((o, i) => (
        <Radio key={o} name={name} value={o} label={o} required={pflicht && i === 0} />
      ))}
      {fehler && (
        <p id={`${id}-fehler`} className={s.fehler}>
          <AlertCircle size={16} strokeWidth={2} aria-hidden /> {fehler}
        </p>
      )}
    </fieldset>
  );
}

export function Radio({ label, ...rest }: { label: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={s.wahl}>
      <input id={id} type="radio" className={s.radio} {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
