import Image from 'next/image';
import Link from 'next/link';
import { nav } from '@/config/content';
import { SignOut } from './SignOut';

/**
 * Sticky, one-line header. The mobile menu is a native <details> so it works
 * before hydration and needs no JavaScript.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/92 backdrop-blur-[2px]">
      <div className="wrap flex h-14 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="JEDeye home">
          <Image src="/images/JEDeye_transparent_logo.png" alt="" width={28} height={28} priority />
          <span className="font-display text-lg font-semibold tracking-tight">JEDeye</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 text-sm text-ink-2 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="py-2 transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SignOut />
          <a href="#contact" className="btn btn-primary !min-h-9 !py-1.5">
            Request a pilot
          </a>
        </div>

        <details className="relative md:hidden">
          <summary className="btn btn-ghost !min-h-9 cursor-pointer list-none !px-3 text-sm">Menu</summary>
          <div className="absolute right-0 top-11 w-56 rounded-md border border-rule bg-paper p-2 shadow-sm">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="block rounded px-3 py-2 text-sm hover:bg-paper-2">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="mt-1 block rounded px-3 py-2 text-sm font-medium text-accent-strong hover:bg-paper-2">
              Request a pilot
            </a>
            <div className="mt-1 border-t border-rule px-3 pt-2">
              <SignOut />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
