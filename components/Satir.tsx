import { Fragment } from 'react';

/** İçerikteki satır içi işaretler: `**kalın**` ve `` `kod` ``. Başka bir şey desteklenmez. */
export function Satir({ metin }: { metin: string }) {
  const parcalar = metin.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parcalar.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-yazi">
              {p.slice(2, -2)}
            </strong>
          );
        }
        if (p.startsWith('`') && p.endsWith('`')) {
          return (
            <code key={i} className="rounded-sm bg-zemin-2 px-1 py-0.5 font-mono text-[0.88em] text-yazi">
              {p.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
