'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { mainNav } from '@/data/site';
import { Logo } from './Logo';
import { Button } from './Button';
import s from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const aktiv = (href: string) => pathname === href || pathname.startsWith(href);
  return (
    <header className={s.header}>
      <div className={`container ${s.inner}`}>
        <Logo />
        <nav className={s.nav} aria-label="Hauptnavigation">
          <ul className={s.liste}>
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={s.link} aria-current={aktiv(n.href) ? 'page' : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.werkzeuge}>
          <Link href="/suche/" className={s.icon} aria-label="Suche">
            <Search size={20} strokeWidth={1.75} aria-hidden />
          </Link>
          <span className={s.sprache} title="Weitere Sprachen folgen">
            <span className="visually-hidden">Sprache: </span>DE
          </span>
          <Link href="/login/" className={s.link}>
            Login
          </Link>
          <Button href="/kurse/" className={s.cta}>
            Jetzt starten
          </Button>
        </div>
        <MobileNavigation pathname={pathname} />
      </div>
    </header>
  );
}

/** Mobile Navigation: Knopf öffnet ein Panel; Escape schließt, Fokus kehrt zum Knopf zurück. */
export function MobileNavigation({ pathname }: { pathname: string }) {
  const [offen, setOffen] = useState(false);
  const knopf = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => setOffen(false), [pathname]);
  useEffect(() => {
    if (!offen) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOffen(false);
        knopf.current?.focus();
      }
    };
    document.addEventListener('keydown', esc);
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [offen]);

  return (
    <div className={s.mobil}>
      <button
        ref={knopf}
        type="button"
        className={s.menuKnopf}
        aria-expanded={offen}
        aria-controls="mobile-nav"
        onClick={() => setOffen((o) => !o)}
      >
        {offen ? <X size={24} strokeWidth={1.75} aria-hidden /> : <Menu size={24} strokeWidth={1.75} aria-hidden />}
        <span className="visually-hidden">{offen ? 'Menü schließen' : 'Menü öffnen'}</span>
      </button>
      <div id="mobile-nav" ref={panel} className={s.panel} hidden={!offen}>
        <nav aria-label="Hauptnavigation mobil">
          <ul className={s.mobilListe}>
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={s.mobilLink} aria-current={pathname.startsWith(n.href) ? 'page' : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/suche/" className={s.mobilLink}>
                Suche
              </Link>
            </li>
            <li>
              <Link href="/login/" className={s.mobilLink}>
                Login
              </Link>
            </li>
          </ul>
        </nav>
        <Button href="/kurse/" full>
          Jetzt starten
        </Button>
      </div>
    </div>
  );
}
