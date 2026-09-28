import type { Metadata } from 'next';
import { AnaSayfa } from '@/components/AnaSayfa';
import { anaSayfaMeta } from '@/lib/meta';

export const metadata: Metadata = anaSayfaMeta('tr');

export default function Sayfa() {
  return <AnaSayfa dil="tr" />;
}
