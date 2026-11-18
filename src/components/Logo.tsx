import Link from 'next/link';
import s from './Logo.module.css';

/** Typografische Wortmarke als Platzhalter, bis ein freigegebenes Innoform-Plus-Logo vorliegt. */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`${s.logo} ${inverse ? s.inverse : ''}`} aria-label="Innoform Plus – zur Startseite">
      <span className={s.wort}>INNOFORM</span>
      <span className={s.plus} aria-hidden>
        PLUS
      </span>
    </Link>
  );
}
