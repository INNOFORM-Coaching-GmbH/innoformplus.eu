import type { ReactNode } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import s from './lernen.module.css';

/** Schlanker Kopf für die Lernansicht: wenig Ablenkung, ein Ausgang zum Lernbereich. */
export default function LernenLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={s.kopf}>
        <div className={s.kopfInner}>
          <Logo inverse />
          <Link href="/dashboard/" className={s.schliessen}>
            <X size={20} strokeWidth={1.75} aria-hidden />
            <span>Lernansicht schließen</span>
          </Link>
        </div>
      </header>
      <main id="inhalt" tabIndex={-1}>{children}</main>
    </>
  );
}
