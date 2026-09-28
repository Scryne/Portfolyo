import type { Metadata } from 'next';
import { AnaSayfa } from '@/components/AnaSayfa';
import { anaSayfaMeta } from '@/lib/meta';

export const metadata: Metadata = anaSayfaMeta('en');

export default function Sayfa() {
  return <AnaSayfa dil="en" />;
}
