import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden px-4 py-10">
      {/* The last frame of the OR sequence, softened, behind a frosted card. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-frames/poster.webp"
          alt=""
          className="h-full w-full scale-105 object-cover"
          style={{ filter: 'blur(14px) saturate(1.25)' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.25_0.04_230/0.25),oklch(0.15_0.04_230/0.55))]" />
      </div>

      <div className="login-card reveal w-full max-w-[26rem]" style={{ ['--i' as string]: 0 }}>
        <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center sm:px-10">
          <div className="grid h-16 w-16 place-items-center rounded-[1.25rem] bg-paper shadow-[0_8px_24px_-12px_oklch(0.2_0.04_230/0.6)] ring-1 ring-rule">
            <Image src="/images/JEDeye_transparent_logo.png" alt="" width={40} height={40} priority />
          </div>
          <h1 className="mt-6 text-[1.75rem] font-semibold tracking-[-0.02em] text-ink">Sign in to JEDeye</h1>
          <p className="mt-1.5 text-[0.9375rem] text-ink-2">Choose your profile, then enter the shared password.</p>
        </div>
        <div className="px-6 pb-8 sm:px-8">
          <LoginForm />
        </div>
      </div>

      <p className="absolute inset-x-0 bottom-5 text-center text-xs text-[oklch(0.85_0.015_230/0.7)]">
        Confidential · for invited reviewers
      </p>
    </main>
  );
}
