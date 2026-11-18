import { UserRound } from 'lucide-react';
import { PlaceholderNote } from './Section';
import s from './ExpertBlock.module.css';

/** Experte/Kurs-Halter. Ohne gelieferte Angaben zeigt der Block einen gekennzeichneten Platzhalter – nie erfundene Personen. */
export function ExpertBlock({ experte, ebene = 'h3' }: { experte?: { name: string; rolle: string; profil: string }; ebene?: 'h2' | 'h3' }) {
  const Titel = ebene;
  return (
    <article className={s.block}>
      <div className={s.bild} aria-hidden>
        <UserRound size={40} strokeWidth={1.5} />
      </div>
      <div className={s.text}>
        <p className="eyebrow">Experte</p>
        {experte ? (
          <>
            <Titel className="h3">{experte.name}</Titel>
            <p className={s.rolle}>{experte.rolle}</p>
            <p className="muted">{experte.profil}</p>
          </>
        ) : (
          <>
            <Titel className="h3">Angaben folgen</Titel>
            <p className="muted">Name, Funktion und Kurzprofil des Experten werden ergänzt, sobald sie freigegeben sind.</p>
            <PlaceholderNote />
          </>
        )}
      </div>
    </article>
  );
}
