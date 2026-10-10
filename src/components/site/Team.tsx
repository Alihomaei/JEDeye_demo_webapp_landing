import Image from 'next/image';
import { team } from '@/config/content';

export function Team() {
  return (
    <section id="team" className="section rule-top" data-rise>
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{team.eyebrow}</p>
            <h2 className="font-display mt-4 text-h2 font-medium">{team.heading}</h2>
          </div>
          <div className="flex items-center gap-8 opacity-80 grayscale">
            {team.affiliations.map((a) => (
              <Image key={a.name} src={a.src} alt={a.name} width={a.width} height={a.height} className="h-9 w-auto" />
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {team.members.map((m) => (
            <li key={m.name} className="flex gap-4 border-t border-rule pt-5">
              <Image src={m.image} alt="" width={72} height={72} className="h-[72px] w-[72px] rounded-sm object-cover" />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-ink">{m.name}</span>
                <span className="text-sm text-ink-2">{m.role}</span>
                <span className="text-xs text-ink-3">{m.org}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
