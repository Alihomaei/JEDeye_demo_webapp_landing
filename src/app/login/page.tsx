import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-center gap-3">
          <Image src="/images/JEDeye_transparent_logo.png" alt="" width={32} height={32} priority />
          <span className="font-brand text-xl">JEDeye</span>
        </div>
        <p className="eyebrow">Investor review</p>
        <h1 className="font-display mt-3 text-h2 font-medium">Sign in to continue.</h1>
        <p className="mt-2 text-ink-2">Choose your profile and enter the shared password.</p>
        <div className="mt-8 rule-top pt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
