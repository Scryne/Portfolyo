import '../globals.css';
import type { Metadata, Viewport } from 'next';
import { KokDuzen } from '@/components/KokDuzen';
import { kokMeta } from '@/lib/meta';

export const metadata: Metadata = kokMeta('en');
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ECEEEA' },
    { media: '(prefers-color-scheme: dark)', color: '#101317' },
  ],
};

export default function Duzen({ children }: { children: React.ReactNode }) {
  return <KokDuzen dil="en">{children}</KokDuzen>;
}
