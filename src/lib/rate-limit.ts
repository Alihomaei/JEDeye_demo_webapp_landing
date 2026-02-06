/**
 * Simple In-Memory Rate Limiter
 *
 * Tracks requests by IP address and enforces rate limits.
 * Note: In-memory storage won't persist across serverless invocations,
 * but provides basic protection against rapid successive requests.
 *
 * For production use with high traffic, consider:
 * - Vercel KV or Redis for distributed rate limiting
 * - Upstash Rate Limit library
 */

// Rate limit configuration
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 10; // 10 requests per window

// In-memory store for tracking requests
// Map<IP, { count: number, resetTime: number }>
const requestStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Result of a rate limit check
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Number of requests remaining in the current window */
  remaining: number;
  /** Timestamp when the rate limit window resets */
  resetTime: number;
}

/**
 * Cleans up expired entries from the store
 * Called periodically to prevent memory leaks
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  requestStore.forEach((data, ip) => {
    if (now > data.resetTime) {
      requestStore.delete(ip);
    }
  });
}

/**
 * Checks rate limit for a given IP address
 *
 * @param ip - The IP address to check
 * @returns RateLimitResult indicating if request is allowed
 *
 * @example
 * ```typescript
 * const ip = request.headers.get('x-forwarded-for') || 'unknown';
 * const result = checkRateLimit(ip);
 * if (!result.allowed) {
 *   return errorResponse('RATE_LIMITED', 'Too many requests', 429);
 * }
 * ```
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  // Cleanup expired entries occasionally (1% chance per request)
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  // Get or create entry for this IP
  let entry = requestStore.get(ip);

  // If no entry exists or window has expired, create new entry
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    requestStore.set(ip, entry);

    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count += 1;

  // Check if over limit
  if (entry.count > MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Extracts the client IP address from a Next.js request
 *
 * @param request - The Next.js request object
 * @returns The client IP address or 'unknown' if not found
 */
export function getClientIp(request: Request): string {
  // Try various headers that might contain the real IP
  // x-forwarded-for is standard for proxies/load balancers (Vercel uses this)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  // x-real-ip is another common header
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Fallback to unknown (all unknown IPs share the same bucket)
  return 'unknown';
}
