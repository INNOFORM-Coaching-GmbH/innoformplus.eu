import { Suspense } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Skeleton } from '@/components/States';
import { CourseGrid } from '@/components/Course';
import { courses } from '@/data/courses';
import { seite } from '@/lib/seo';
import { Katalog } from './Katalog';

export const metadata = seite({
  titel: 'Kurse',
  beschreibung: 'Alle Kurse von Innoform Plus: Fachwissen zu Folien, Verbunden, Beuteln, Abpacken und Recycling in kurzen Lernstationen.',
  pfad: '/kurse/',
});

export default function KursePage() {
  return (
    <>
      <PageHeader
        krumen={[{ name: 'Start', pfad: '/' }, { name: 'Kurse', pfad: '/kurse/' }]}
        eyebrow="Kurskatalog"
        titel="Kurse"
        text="Fachwissen für die gesamte Welt der flexiblen Verpackungen – in kurzen Lernstationen, von Branchenexperten."
      />
      <section className="section" aria-label="Kursliste">
        <div className="container">
          {/* Ohne JavaScript bzw. bis die Filter geladen sind: vollständige Liste (auch für Suchmaschinen) */}
          <Suspense fallback={<><Skeleton hoehe={56} /><div style={{ marginTop: 32 }}><CourseGrid courses={courses} ebene="h2" /></div></>}>
            <Katalog />
          </Suspense>
        </div>
      </section>
    </>
  );
}
