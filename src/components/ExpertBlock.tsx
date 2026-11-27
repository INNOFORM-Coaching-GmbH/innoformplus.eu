import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PlaceholderNote } from './Section';
import { initialen, rolleText, type Experte } from '@/data/experten';
import s from './ExpertBlock.module.css';

/** Porträt oder, solange kein freigegebenes Foto vorliegt, die Initialen */
export function ExpertPortrait({ experte, gross = false }: { experte: Experte; gross?: boolean }) {
  const cls = `${s.bild} ${gross ? s.gross : ''}`;
  if (experte.foto) return <img className={cls} src={experte.foto} alt="" width={gross ? 160 : 88} height={gross ? 160 : 88} />;
  return (
    <div className={`${cls} ${s.initialen}`} aria-hidden>
      {initialen(experte)}
    </div>
  );
}

/** Experte/Kurs-Halter mit Link zum Profil. Ohne Angaben zeigt der Block einen gekennzeichneten Platzhalter – nie erfundene Personen. */
export function ExpertBlock({ experte, ebene = 'h3' }: { experte?: Experte; ebene?: 'h2' | 'h3' }) {
  const Titel = ebene;
  if (!experte)
    return (
      <article className={s.block}>
        <div className={`${s.bild} ${s.initialen}`} aria-hidden>?</div>
        <div className={s.text}>
          <p className="eyebrow">Experte</p>
          <Titel className="h3">Angaben folgen</Titel>
          <p className="muted">Name, Funktion und Kurzprofil des Experten werden ergänzt, sobald sie freigegeben sind.</p>
          <PlaceholderNote />
        </div>
      </article>
    );
  const pfad = `/experten/${experte.slug}/`;
  return (
    <article className={s.block}>
      <ExpertPortrait experte={experte} />
      <div className={s.text}>
        <p className="eyebrow">Experte</p>
        <Titel className="h3">
          <Link href={pfad} className={s.name}>{experte.name}</Link>
        </Titel>
        <p className={s.rolle}>{rolleText(experte)}</p>
        {experte.kurzprofil && <p className="muted">{experte.kurzprofil}</p>}
        <p>
          <Link href={pfad} className={s.mehr}>
            Zum Profil <ArrowRight size={16} aria-hidden />
          </Link>
        </p>
      </div>
    </article>
  );
}

/** Karte für die Expertenübersicht; die ganze Karte ist über den Namen klickbar */
export function ExpertCard({ experte, kurse }: { experte: Experte; kurse: number }) {
  return (
    <article className={s.karte}>
      <ExpertPortrait experte={experte} />
      <div className={s.text}>
        <h2 className="h3">
          <Link href={`/experten/${experte.slug}/`} className={`${s.name} ${s.flaeche}`}>{experte.name}</Link>
        </h2>
        <p className={s.rolle}>{rolleText(experte)}</p>
        {experte.kurzprofil && <p className="muted">{experte.kurzprofil}</p>}
        {kurse > 0 && <p className={s.klein}>{kurse === 1 ? '1 Kurs' : `${kurse} Kurse`} auf Innoform Plus</p>}
      </div>
    </article>
  );
}
