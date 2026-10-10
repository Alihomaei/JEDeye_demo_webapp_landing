'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const users = [
  {
    id: 'founder-1',
    name: 'Ali Tavakkoli, MD',
    title: 'Chief, Professor of Surgery',
    image: '/images/team/AT.jpg',
  },
  {
    id: 'founder-2',
    name: 'Farhad R. Nezami, PhD',
    title: 'Assistant Professor of Surgery',
    image: '/images/team/FRN.webp',
  },
  {
    id: 'founder-3',
    name: 'Ali Homaei, MD, MBA',
    title: 'Postdoctoral Fellow of Surgery',
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* User selection cards */}
      <div>
        <label className="block text-sm font-medium text-ink mb-3">
          Select your profile
        </label>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => {
                setSelectedUser(user.id);
                setError('');
              }}
              className={`rounded-md border border-rule bg-paper p-3 sm:p-4 text-center transition-all duration-200 cursor-pointer ${
                selectedUser === user.id
                  ? 'ring-2 ring-accent'
                  : 'hover:bg-paper-2'
              }`}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-full overflow-hidden">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-ink leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] sm:text-xs text-ink-2 mt-0.5 leading-tight">
                {user.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Password field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-ink mb-2"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter shared password"
            className="h-11 pr-11 bg-paper border-rule-strong text-ink placeholder:text-ink-3"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((shown) => !shown)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-ink-2 hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-danger bg-paper-2 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading || !selectedUser}
        className="w-full h-11 btn-primary font-medium"
        size="lg"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
