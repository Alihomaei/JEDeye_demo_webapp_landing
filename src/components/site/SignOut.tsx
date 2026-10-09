'use client';

import { signOut, useSession } from 'next-auth/react';

export function SignOut() {
  const { data } = useSession();
  if (!data?.user) return null;
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="py-2 text-xs text-ink-3 transition-colors hover:text-ink"
    >
      Sign out
    </button>
  );
}
