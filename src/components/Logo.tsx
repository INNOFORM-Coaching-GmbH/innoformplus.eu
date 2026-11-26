import Link from 'next/link';
import s from './Logo.module.css';

/**
 * Innoform-Plus-Logo aus dem Plattform-Prototyp (26.11.2026): Wortmarke Navy, Plus Magenta (public/brand/innoform-plus-logo.svg).
 * inverse: Wortmarke weiß für dunkle Flächen (Footer). gross: Footer-Größe.
 */
export function Logo({ inverse = false, gross = false }: { inverse?: boolean; gross?: boolean }) {
  return (
    <Link href="/" className={`${s.logo} ${gross ? s.gross : ''}`} aria-label="Innoform Plus – zur Startseite">
      <img className={s.bild} src={inverse ? '/brand/innoform-plus-logo-weiss.svg' : '/brand/innoform-plus-logo.svg'} alt="" width={1041} height={197} />
    </Link>
  );
}
