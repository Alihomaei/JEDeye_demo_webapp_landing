export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images/|videos/|frames/|favicon\\.ico|og-image\\.png|api/auth).*)',
  ],
};
