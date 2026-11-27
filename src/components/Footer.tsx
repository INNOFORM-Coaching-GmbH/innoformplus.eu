import Link from 'next/link';
import { mainNav, e2g } from '@/data/site';
import { Logo } from './Logo';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.marke}>
          <Logo inverse gross />
          <p className={s.claim}>
            Technical clarity
            <br />
            meets human expertise.
          </p>
          <p className={s.klein}>Ein Angebot der Innoform Coaching GmbH. Ausschließlich für Unternehmen, Gewerbetreibende und Selbstständige.</p>
        </div>
        <nav aria-label="Plattform" className={s.spalte}>
          <h2 className={s.titel}>Plattform</h2>
          <ul>
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Service" className={s.spalte}>
          <h2 className={s.titel}>Service</h2>
          <ul>
            <li><Link href="/experten/">Experten</Link></li>
            <li><Link href="/suche/">Suche</Link></li>
            <li><Link href="/login/">Login</Link></li>
            <li><Link href="/kontakt/">Kontakt</Link></li>
            <li><a href={e2g.innoform}>innoform-coaching.de</a></li>
          </ul>
        </nav>
        <nav aria-label="Rechtliches" className={s.spalte}>
          <h2 className={s.titel}>Rechtliches</h2>
          <ul>
            <li><Link href="/impressum/">Impressum</Link></li>
            <li><Link href="/datenschutz/">Datenschutz</Link></li>
            <li><Link href="/agb/">AGB</Link></li>
          </ul>
        </nav>
      </div>
      <div className={`container ${s.unten}`}>
        <span>© {new Date().getFullYear()} Innoform Coaching GmbH</span>
        <span>Alle Preise netto zzgl. gesetzlicher USt.</span>
      </div>
    </footer>
  );
}
