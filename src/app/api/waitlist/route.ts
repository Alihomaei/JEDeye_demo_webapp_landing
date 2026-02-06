/**
 * Waitlist API Route
 * 
 * POST /api/waitlist
 * 
 * Handles waitlist form submissions and stores them in Google Sheets.
 * Includes validation, spam protection (honeypot), and proper error handling.
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { waitlistSchema } from '@/lib/validations';
import { appendToSheet } from '@/lib/google-sheets';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

// API Response Types
type ApiResponse = {
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
  };
};

// Sheet tab name from environment variable
const WAITLIST_TAB = process.env.GOOGLE_SHEET_WAITLIST_TAB || 'Waitlist';

/**
 * Creates a success response
 */
function successResponse(message: string): NextResponse<ApiResponse> {
  return NextResponse.json({ success: true, message }, { status: 200 });
}

/**
 * Creates an error response
 */
function errorResponse(
  code: string,
  message: string,
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  );
}

/**
 * POST handler for waitlist submissions
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  // Check rate limit first
  const clientIp = getClientIp(request);
  const rateLimitResult = checkRateLimit(clientIp);

  if (!rateLimitResult.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return errorResponse(
      'RATE_LIMITED',
      'Too many requests. Please try again later.',
      429
    );
  }

  try {
    // Parse JSON body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse('VALIDATION_ERROR', 'Invalid JSON body', 400);
    }

    // Check honeypot field BEFORE validation (spam protection)
    // Must check before Zod validation because schema has max(0) which would
    // throw validation error instead of spam error
    if (
      typeof body === 'object' &&
      body !== null &&
      'honeypot' in body &&
      typeof (body as Record<string, unknown>).honeypot === 'string' &&
      ((body as Record<string, unknown>).honeypot as string).length > 0
    ) {
      console.warn('Spam detected: honeypot field was filled');
      return errorResponse('SPAM_DETECTED', 'Submission rejected', 400);
    }

    // Validate with Zod schema
    const validatedData = waitlistSchema.parse(body);

    // Generate timestamp in ISO 8601 format
    const timestamp = new Date().toISOString();

    // Prepare row values for Google Sheets
    // Order must match the sheet columns: Timestamp, Email, Name, Organization, Role
    const values = [
      timestamp,
      validatedData.email,
      validatedData.name || '',
      validatedData.organization || '',
      validatedData.role || '',
    ];

    // Append to Google Sheets
    await appendToSheet(WAITLIST_TAB, values);

    // Return success response
    return successResponse("Thank you! You're on the waitlist.");

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const firstIssue = error.issues[0];
      const message = firstIssue?.message || 'Validation failed';
      console.error('Waitlist validation error:', error.issues);
      return errorResponse('VALIDATION_ERROR', message, 400);
    }

    // Handle Google Sheets API errors
    if (error instanceof Error && error.message.includes('Google Sheets API')) {
      console.error('Google Sheets error:', error.message);
      return errorResponse(
        'SUBMISSION_FAILED',
        'Unable to submit. Please try again or email us directly.',
        500
      );
    }

    // Handle unexpected errors
    console.error('Unexpected error in waitlist API:', error);
    return errorResponse(
      'SUBMISSION_FAILED',
      'Unable to submit. Please try again or email us directly.',
      500
    );
  }
}
