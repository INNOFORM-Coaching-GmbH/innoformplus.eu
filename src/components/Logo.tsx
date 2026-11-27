import Link from 'next/link';
import s from './Logo.module.css';

/**
 * INNOFORM+ „konsequent einfarbig“ (Entwurf 27.11.2026): Wortmarke und Plus in #0D4978 (public/brand/innoform-plus-logo.svg).
 * inverse: weiß für dunkle Flächen (Footer). gross: Footer-Größe. App-Icon I+: public/brand/innoform-plus-icon.svg.
 */
export function Logo({ inverse = false, gross = false }: { inverse?: boolean; gross?: boolean }) {
  return (
    <Link href="/" className={`${s.logo} ${gross ? s.gross : ''}`} aria-label="Innoform Plus – zur Startseite">
      <img className={s.bild} src={inverse ? '/brand/innoform-plus-logo-weiss.svg' : '/brand/innoform-plus-logo.svg'} alt="" width={947} height={131} />
    </Link>
  );
}
