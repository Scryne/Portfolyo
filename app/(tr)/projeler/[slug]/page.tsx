import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjeSayfasi } from '@/components/ProjeSayfasi';
import { PROJELER, projeBul } from '@/content/projeler';
import { projeMeta } from '@/lib/meta';

const DIL = 'tr';

export const dynamicParams = false;
export function generateStaticParams() {
  return PROJELER.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/projeler/[slug]'>): Promise<Metadata> {
  const p = projeBul((await params).slug);
  return p ? projeMeta(p, DIL) : {};
}

export default async function Sayfa({ params }: PageProps<'/projeler/[slug]'>) {
  const p = projeBul((await params).slug);
  if (!p) notFound();
  return <ProjeSayfasi p={p} dil={DIL} />;
}
