'use client';

import {
  ArrowUpRight,
  Check,
  Copy,
  CornerDownLeft,
  FileDown,
  Hash,
  Languages,
  Mail,
  Menu,
  SunMoon,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { karsilik, M, yol } from '@/lib/metin';
import { temaDegistir } from '@/lib/tema';
import type { Dil } from '@/lib/tipler';

export type KomutProje = { slug: string; ad: string; alan: string; href: string };

type Props = {
  dil: Dil;
  projeler: KomutProje[];
  eposta: { kullanici: string; alan: string };
  github: string;
  linkedin: string;
};

const METIN = {
  ac: { tr: 'Ara ve git', en: 'Search and jump' },
  menu: { tr: 'Menüyü aç', en: 'Open menu' },
  yer: { tr: 'Proje, bölüm ya da eylem ara', en: 'Search projects, sections or actions' },
  baslik: { tr: 'Gezinme', en: 'Navigation' },
  bolumler: { tr: 'Bölümler', en: 'Sections' },
  projeler: { tr: 'Projeler', en: 'Projects' },
  eylemler: { tr: 'Eylemler', en: 'Actions' },
  bos: { tr: 'Eşleşen bir şey yok.', en: 'Nothing matches.' },
  kopyala: { tr: 'E-posta adresini kopyala', en: 'Copy email address' },
  kopyalandi: { tr: 'Kopyalandı', en: 'Copied' },
  yaz: { tr: 'E-posta gönder', en: 'Send an email' },
  tema: { tr: 'Temayı değiştir', en: 'Toggle theme' },
  sec: { tr: 'seç', en: 'select' },
  git: { tr: 'aç', en: 'open' },
  kapat: { tr: 'kapat', en: 'close' },
} satisfies Record<string, Record<Dil, string>>;

type Grup = 'bolumler' | 'projeler' | 'eylemler';
type Oge = { id: string; grup: Grup; ad: string; ipucu?: React.ReactNode; ikon: LucideIcon; ara: string; yap: () => void | 'kal' };

/** Aramada büyük/küçük harf ve aksan fark etmesin: "yapirisk" YapıRisk'i, "olcum" ölçümü bulsun. */
const sade = (s: string) =>
  s.toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '');

const abone = () => () => {};
const macMi = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/**
 * Komut paleti: Ctrl/⌘ K ya da "/" ile açılır; projeler, ana sayfa bölümleri ve eylemler (CV, e-posta, tema, dil)
 * tek arama kutusunda. Dar ekranda nav bağlantıları gizli olduğu için menü düğmesi de bunu açar. Yerel <dialog>:
 * odak içeride kalır, Escape kapatır, odak açan düğmeye döner.
 */
export function Komut({ dil, projeler, eposta, github, linkedin }: Props) {
  const router = useRouter();
  const yolAdi = usePathname();
  const pencere = useRef<HTMLDialogElement>(null);
  const girdi = useRef<HTMLInputElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const kimlik = useId();
  const [sorgu, setSorgu] = useState('');
  const [secili, setSecili] = useState(0);
  const [kopyalandi, setKopyalandi] = useState(false);
  const mac = useSyncExternalStore(abone, macMi, () => false);

  const ac = () => {
    setSorgu('');
    setSecili(0);
    setKopyalandi(false);
    pencere.current?.showModal();
  };
  const kapat = () => pencere.current?.close();

  useEffect(() => {
    const tus = (e: KeyboardEvent) => {
      const yaziyor = e.target instanceof HTMLElement && (e.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName));
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (pencere.current?.open) kapat();
        else ac();
      } else if (e.key === '/' && !yaziyor && !pencere.current?.open) {
        e.preventDefault();
        ac();
      }
    };
    addEventListener('keydown', tus);
    return () => removeEventListener('keydown', tus);
  }, []);

  const ogeler = useMemo<Oge[]>(() => {
    const ana = yol.ana(dil);
    const anaSayfada = yolAdi === ana || yolAdi === ana.replace(/\/$/, '');
    const bolum = (id: string, ad: string): Oge => ({
      id: `b-${id}`,
      grup: 'bolumler',
      ad,
      ikon: Hash,
      ara: ad,
      yap: () => {
        const el = anaSayfada ? document.getElementById(id) : null;
        if (el) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        else router.push(`${ana}#${id}`, { transitionTypes: ['geri'] });
      },
    });
    const disari = (url: string) => () => void window.open(url, '_blank', 'noopener,noreferrer');
    const adres = `${eposta.kullanici}@${eposta.alan}`;
    const indir = (href: string) => () => {
      const a = document.createElement('a');
      a.href = href;
      a.download = '';
      a.click();
    };
    return [
      bolum('work', M.seciliIsler[dil]),
      bolum('projeler', M.tumProjeler[dil]),
      bolum('method', M.yontemBaslik[dil]),
      bolum('cv', M.cvBaslik[dil]),
      ...projeler.map<Oge>((p) => ({
        id: `p-${p.slug}`,
        grup: 'projeler',
        ad: p.ad,
        ipucu: p.alan,
        ikon: ArrowUpRight,
        ara: `${p.ad} ${p.alan}`,
        yap: () => router.push(p.href, { transitionTypes: ['ileri'] }),
      })),
      { id: 'e-cv-tr', grup: 'eylemler', ad: M.cvTr[dil], ipucu: 'PDF', ikon: FileDown, ara: `${M.cvTr[dil]} cv resume özgeçmiş`, yap: indir(yol.cv('tr')) },
      { id: 'e-cv-en', grup: 'eylemler', ad: M.cvEn[dil], ipucu: 'PDF', ikon: FileDown, ara: `${M.cvEn[dil]} cv resume özgeçmiş`, yap: indir(yol.cv('en')) },
      {
        id: 'e-kopyala',
        grup: 'eylemler',
        ad: METIN.kopyala[dil],
        // Adres HTML'de tek parça durmaz ("@" ayrı öğe), bkz. EpostaSatiri: palet sunucuda da çiziliyor.
        ipucu: kopyalandi ? (
          METIN.kopyalandi[dil]
        ) : (
          <>
            {eposta.kullanici}
            <span>@</span>
            {eposta.alan}
          </>
        ),
        ikon: kopyalandi ? Check : Copy,
        ara: `${METIN.kopyala[dil]} email e-posta mail`,
        yap: () => {
          navigator.clipboard?.writeText(adres).then(() => setKopyalandi(true), () => {});
          return 'kal';
        },
      },
      { id: 'e-yaz', grup: 'eylemler', ad: METIN.yaz[dil], ikon: Mail, ara: `${METIN.yaz[dil]} email e-posta mail iletişim contact`, yap: () => void (location.href = `mailto:${adres}`) },
      { id: 'e-github', grup: 'eylemler', ad: 'GitHub', ipucu: 'github.com/Scryne', ikon: ArrowUpRight, ara: 'github kod code repo', yap: disari(github) },
      { id: 'e-linkedin', grup: 'eylemler', ad: 'LinkedIn', ikon: ArrowUpRight, ara: 'linkedin', yap: disari(linkedin) },
      { id: 'e-tema', grup: 'eylemler', ad: METIN.tema[dil], ikon: SunMoon, ara: `${METIN.tema[dil]} theme dark light koyu açık`, yap: () => temaDegistir() },
      {
        id: 'e-dil',
        grup: 'eylemler',
        ad: M.dilDegistir[dil],
        ikon: Languages,
        ara: `${M.dilDegistir[dil]} language dil english türkçe`,
        yap: () => router.push(karsilik(yolAdi)),
      },
    ];
  }, [dil, projeler, eposta, github, linkedin, router, yolAdi, kopyalandi]);

  const gorunen = useMemo(() => {
    const kelimeler = sade(sorgu).split(/\s+/).filter(Boolean);
    return kelimeler.length ? ogeler.filter((o) => kelimeler.every((k) => sade(o.ara).includes(k))) : ogeler;
  }, [ogeler, sorgu]);
  const aktif = Math.min(secili, Math.max(0, gorunen.length - 1));

  // Klavyeyle seçilen satır görünür alanda kalsın.
  useEffect(() => {
    liste.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [aktif, gorunen]);

  const calistir = (o: Oge) => {
    if (o.yap() === 'kal') return;
    kapat();
  };

  const tus = (e: React.KeyboardEvent) => {
    const n = gorunen.length;
    if (!n) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSecili((aktif + (e.key === 'ArrowDown' ? 1 : -1) + n) % n);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      setSecili(e.key === 'Home' ? 0 : n - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      calistir(gorunen[aktif]);
    }
  };

  const gruplar = (['bolumler', 'projeler', 'eylemler'] as const)
    .map((g) => ({ g, ogeler: gorunen.filter((o) => o.grup === g) }))
    .filter((x) => x.ogeler.length);
  const kisayol = mac ? '⌘K' : 'Ctrl K';

  return (
    <>
      <button
        type="button"
        onClick={ac}
        aria-label={METIN.ac[dil]}
        aria-keyshortcuts="Control+K Meta+K /"
        className="hidden h-10 items-center gap-2 rounded-full border border-cizgi pr-2 pl-3.5 text-yazi-2 transition-colors duration-150 hover:border-cizgi-guclu hover:text-yazi md:inline-flex"
      >
        <Search aria-hidden className="size-4" />
        <kbd className="etiket rounded-[4px] border border-cizgi bg-zemin-2 px-1.5 py-0.5 text-[0.6875rem] text-yazi-3">{kisayol}</kbd>
      </button>
      <button
        type="button"
        onClick={ac}
        aria-label={METIN.menu[dil]}
        className="grid size-10 place-items-center rounded-full border border-cizgi text-yazi-2 transition-colors duration-150 hover:border-cizgi-guclu hover:text-yazi md:hidden"
      >
        <Menu aria-hidden className="size-4" />
      </button>

      <dialog
        ref={pencere}
        aria-label={METIN.baslik[dil]}
        onClick={(e) => e.target === e.currentTarget && kapat()}
        className="komut m-0 mx-auto mt-[min(14vh,8rem)] max-h-[min(36rem,80dvh)] w-[min(calc(100vw-2rem),40rem)] overflow-visible bg-transparent p-0 text-yazi backdrop:bg-black/50"
      >
        <div className="komut-yuzey flex max-h-[min(36rem,80dvh)] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--cam-kenar)] shadow-[var(--golge)]">
          <div className="flex items-center gap-3 border-b border-[var(--cam-kenar)] px-4">
            <Search aria-hidden className="size-4 shrink-0 text-yazi-3" />
            <input
              ref={girdi}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={`${kimlik}-liste`}
              aria-activedescendant={gorunen[aktif] ? `${kimlik}-${gorunen[aktif].id}` : undefined}
              aria-autocomplete="list"
              aria-label={METIN.yer[dil]}
              placeholder={METIN.yer[dil]}
              autoComplete="off"
              spellCheck={false}
              autoFocus
              value={sorgu}
              onChange={(e) => {
                setSorgu(e.target.value);
                setSecili(0);
              }}
              onKeyDown={tus}
              className="h-14 min-w-0 flex-1 bg-transparent text-[1.0625rem] text-yazi outline-none placeholder:text-yazi-3"
            />
            <kbd className="etiket hidden rounded-[4px] border border-cizgi px-1.5 py-0.5 text-[0.6875rem] text-yazi-3 sm:block">esc</kbd>
          </div>

          <ul ref={liste} id={`${kimlik}-liste`} role="listbox" aria-label={METIN.baslik[dil]} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
            {gruplar.map(({ g, ogeler: grupOgeleri }) => (
              <li key={g} role="presentation" className="pb-1">
                <p id={`${kimlik}-${g}`} className="etiket px-3 pt-3 pb-1.5 text-yazi-3" aria-hidden>
                  {METIN[g][dil]}
                </p>
                <ul role="group" aria-labelledby={`${kimlik}-${g}`}>
                  {grupOgeleri.map((o) => {
                    const sec = gorunen[aktif]?.id === o.id;
                    const Ikon = o.ikon;
                    return (
                      <li
                        key={o.id}
                        id={`${kimlik}-${o.id}`}
                        role="option"
                        aria-selected={sec}
                        onPointerMove={() => !sec && setSecili(gorunen.indexOf(o))}
                        onClick={() => calistir(o)}
                        className="komut-oge flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5"
                      >
                        <Ikon aria-hidden className="size-4 shrink-0 text-yazi-3" />
                        <span className={`min-w-0 flex-1 truncate ${o.grup === 'projeler' ? 'baslik text-[1.0625rem]' : 'text-[0.9375rem]'}`}>{o.ad}</span>
                        {o.ipucu && <span className="etiket hidden truncate text-yazi-3 sm:block">{o.ipucu}</span>}
                        <CornerDownLeft aria-hidden className="komut-gir size-3.5 shrink-0 text-murekkep" />
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
            {!gruplar.length && (
              <li role="presentation" className="px-3 py-10 text-center text-yazi-2">
                {METIN.bos[dil]}
              </li>
            )}
          </ul>

          <p className="etiket hidden items-center gap-4 border-t border-[var(--cam-kenar)] px-4 py-2.5 text-yazi-3 sm:flex" aria-hidden>
            <span>↑↓ {METIN.sec[dil]}</span>
            <span>↵ {METIN.git[dil]}</span>
            <span>esc {METIN.kapat[dil]}</span>
          </p>
          <p className="sr-only" aria-live="polite">
            {kopyalandi ? METIN.kopyalandi[dil] : ''}
          </p>
        </div>
      </dialog>
    </>
  );
}
