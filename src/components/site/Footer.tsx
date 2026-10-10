import { contactInfo } from '@/config/contact';

export function Footer() {
  return (
    <footer className="rule-top">
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-ink-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-brand text-base text-ink">JEDeye</span>
          <span>Division of General and GI Surgery · Mass General Brigham</span>
          <a href={`mailto:${contactInfo.email}`} className="underline-offset-4 hover:underline">
            {contactInfo.email}
          </a>
        </div>
        <p className="max-w-[52ch] text-xs leading-relaxed text-ink-3">
          Demonstrations use the public Cholec80 and CholecTrack20 datasets (CC BY-NC-SA 4.0). Research software; not
          cleared for clinical use. Confidential, for invited reviewers.
        </p>
      </div>
    </footer>
  );
}
