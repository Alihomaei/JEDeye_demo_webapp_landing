'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

export function LoginForm() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState('');
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

    const result = await signIn('credentials', {
      userId: selectedUser,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid password. Please try again.');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* User selection cards */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
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
              className={`glass-card rounded-xl p-3 sm:p-4 text-center transition-all duration-200 cursor-pointer ${
                selectedUser === user.id
                  ? 'ring-2 ring-[hsl(187,100%,33%)] shadow-lg scale-[1.02]'
                  : 'hover:shadow-md'
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
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 leading-tight">
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
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          placeholder="Enter shared password"
          className="h-11 bg-white/60 border-slate-300 text-slate-800 placeholder:text-slate-400"
          required
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50/80 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading || !selectedUser}
        className="w-full h-11 bg-[hsl(187,100%,33%)] hover:bg-[hsl(187,100%,28%)] text-white font-medium"
        size="lg"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
