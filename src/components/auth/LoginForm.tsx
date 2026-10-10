'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

const users = [
  {
    id: 'founder-1',
    name: 'Ali Tavakkoli, MD',
    short: 'Ali Tavakkoli',
    title: 'Chief of Surgery',
    image: '/images/team/AT.jpg',
  },
  {
    id: 'founder-2',
    name: 'Farhad R. Nezami, PhD',
    short: 'Farhad Nezami',
    title: 'Assistant Professor',
    image: '/images/team/FRN.webp',
  },
  {
    id: 'founder-3',
    name: 'Ali Homaei, MD, MBA',
    short: 'Ali Homaei',
    title: 'Postdoctoral Fellow',
    image: '/images/team/AH.jpg',
  },
];

// Auth.js reports every sign-in failure through the same `error` field; only
// CredentialsSignin means the password itself was rejected.
function signInErrorMessage(error: string) {
  switch (error) {
    case 'CredentialsSignin':
      return 'Invalid password. It is case-sensitive — use the eye icon to check what you typed.';
    case 'MissingCSRF':
      return 'Your browser did not send the sign-in cookie. Allow cookies for this site, reload the page and try again.';
    default:
      return `Sign-in failed because of a server problem, not your password (${error}). Please try again in a moment.`;
  }
}

export function LoginForm() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUser) {
      setError('Please select your profile.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        userId: selectedUser,
        password: password.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError(signInErrorMessage(result.error));
        setLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Sign-in could not be completed. Check your connection and try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Profile picker: avatars in a row, selection shown by a ring. */}
      <div role="radiogroup" aria-label="Profile" className="grid grid-cols-3 gap-2">
        {users.map((user) => {
          const active = selectedUser === user.id;
          return (
            <button
              key={user.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setSelectedUser(user.id);
                setError('');
              }}
              className={`group flex flex-col items-center gap-2.5 rounded-2xl px-2 py-3 transition-colors duration-200 ${
                active ? 'bg-paper' : 'hover:bg-paper/60'
              }`}
            >
              <span
                className={`relative block h-[4.25rem] w-[4.25rem] overflow-hidden rounded-full transition-all duration-300 ease-out ${
                  active ? 'scale-[1.06] ring-[3px] ring-accent ring-offset-2 ring-offset-paper' : 'ring-1 ring-rule-strong group-hover:ring-ink-3'
                }`}
              >
                <Image src={user.image} alt="" fill className="object-cover" sizes="68px" />
              </span>
              <span className="flex flex-col">
                <span className={`text-[0.8125rem] font-medium leading-tight ${active ? 'text-ink' : 'text-ink-2'}`}>{user.short}</span>
                <span className="mt-0.5 text-[0.6875rem] leading-tight text-ink-3">{user.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Password */}
      <div className="relative">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          placeholder="Password"
          className="field h-12 w-full rounded-xl pl-4 pr-12 text-[0.9375rem] text-ink placeholder:text-ink-3"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((shown) => !shown)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-ink-3 hover:text-ink focus-visible:outline-none"
        >
          {showPassword ? <EyeOff className="h-[18px] w-[18px]" aria-hidden /> : <Eye className="h-[18px] w-[18px]" aria-hidden />}
        </button>
      </div>

      {error && (
        <p role="alert" className="-mt-2 rounded-xl bg-[oklch(0.97_0.02_25)] px-3.5 py-2.5 text-[0.8125rem] leading-snug text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !selectedUser}
        className="h-12 w-full rounded-xl bg-ink text-[0.9375rem] font-medium text-paper transition-[background-color,transform] duration-200 hover:bg-[oklch(0.3_0.03_230)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? 'Signing in…' : 'Continue'}
      </button>
    </form>
  );
}
