import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  tur?: 'birincil' | 'ikincil';
  indir?: boolean;
  className?: string;
};

const TABAN =
  'inline-flex h-12 items-center justify-center gap-2 rounded-sm px-5 text-[0.9375rem] font-semibold transition-[background-color,border-color,color,scale] duration-150 active:scale-[0.97] [font-variation-settings:"wdth"_108]';
const TURLER = {
  birincil: 'bg-murekkep text-murekkep-ustu hover:bg-[color-mix(in_oklab,var(--murekkep)_88%,var(--yazi))]',
  ikincil: 'border border-cizgi-guclu text-yazi hover:border-yazi-2 hover:bg-zemin-2',
};

export function Dugme({ href, children, tur = 'birincil', indir = false, className = '' }: Props) {
  const sinif = `${TABAN} ${TURLER[tur]} ${className}`;
  if (indir) {
    return (
      <a href={href} download className={sinif}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={sinif}>
      {children}
    </Link>
  );
}
