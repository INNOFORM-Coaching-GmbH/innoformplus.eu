import { Suspense } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { LoadingState } from '@/components/States';
import { seite } from '@/lib/seo';
import { Suche } from './Suche';

export const metadata = seite({ titel: 'Suche', beschreibung: 'Kurse, Lernstationen und Seiten von Innoform Plus durchsuchen.', pfad: '/suche/', privat: true });

export default function SuchePage() {
  return (
    <>
      <PageHeader krumen={[{ name: 'Start', pfad: '/' }, { name: 'Suche', pfad: '/suche/' }]} eyebrow="Suche" titel="Was suchen Sie?" />
      <section className="section">
        <div className="container">
          <Suspense fallback={<LoadingState />}>
            <Suche />
          </Suspense>
        </div>
      </section>
    </>
  );
}
