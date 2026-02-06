import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Sign In',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="glass-light rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/JEDeye_transparent_logo.png"
            alt="JEDeye"
            width={160}
            height={48}
            priority
          />
        </div>

        <h1 className="text-xl font-bold text-slate-800 text-center mb-1">
          Investor Demo
        </h1>
        <p className="text-sm text-slate-500 text-center mb-8">
          Select your profile and enter the shared password
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
