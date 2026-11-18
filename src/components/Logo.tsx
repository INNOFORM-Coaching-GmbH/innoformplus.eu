import Link from 'next/link';
import s from './Logo.module.css';

/**
 * Innoform-Plus-Logo. Quelle: public/brand/innoform-plus-logo-original.webp (weiß, freigestellt).
 * Navy für helle Flächen, Weiß für dunkle Flächen (inverse). „gross“ für den Footer.
 */
export function Logo({ inverse = false, gross = false }: { inverse?: boolean; gross?: boolean }) {
  return (
    <Link href="/" className={`${s.logo} ${gross ? s.gross : ''}`} aria-label="Innoform Plus – zur Startseite">
      <img
        className={s.bild}
        src={inverse ? '/brand/innoform-plus-logo-weiss.png' : '/brand/innoform-plus-logo-navy.png'}
        alt=""
        width={1200}
        height={393}
      />
    </Link>
  );
}
