/**
 * Google Sheets API Client
 * 
 * Provides authentication and helper functions for interacting with Google Sheets.
 * Used by API routes to store waitlist signups and contact form submissions.
 */

import { google } from 'googleapis';

// Environment variable validation
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

/**
 * Validates that all required environment variables are present
 * @throws Error if any required env var is missing
 */
function validateEnvVars(): void {
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error('Missing required environment variable: GOOGLE_SERVICE_ACCOUNT_EMAIL');
  }
  if (!GOOGLE_PRIVATE_KEY) {
    throw new Error('Missing required environment variable: GOOGLE_PRIVATE_KEY');
  }
  if (!GOOGLE_SHEET_ID) {
    throw new Error('Missing required environment variable: GOOGLE_SHEET_ID');
  }
}

/**
 * Creates an authenticated Google Sheets client using service account credentials.
 * Handles the private key newline character conversion from escaped \n to actual newlines.
 * 
 * @returns Authenticated Google Sheets API client
 */
async function getGoogleSheetsClient() {
  validateEnvVars();

  // Handle newline characters in private key
  // Environment variables often store \n as literal characters, need to convert to actual newlines
  const privateKey = GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

/**
 * Appends a row of values to a specified sheet tab in the configured Google Sheet.
 * 
 * @param sheetName - The name of the sheet tab (e.g., "Waitlist" or "Contact")
 * @param values - Array of string values to append as a new row
 * @throws Error if the Google Sheets API call fails
 * 
 * @example
 * ```typescript
 * await appendToSheet('Waitlist', [
 *   '2026-01-06T12:00:00Z',
 *   'user@example.com',
 *   'John Doe',
 *   'Acme Corp',
 *   'Engineer'
 * ]);
 * ```
 */
export async function appendToSheet(
  sheetName: string,
  values: string[]
): Promise<void> {
  try {
    const sheets = await getGoogleSheetsClient();

    // Append values to the specified sheet
    // Range format: "SheetName!A:A" appends to the first available row
    const range = `${sheetName}!A:A`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [values],
      },
    });

    console.log(`Successfully appended row to ${sheetName} sheet`);
  } catch (error) {
    // Log the error with context for debugging
    console.error(`Failed to append to Google Sheet (${sheetName}):`, error);
    
    // Re-throw with a more descriptive message
    if (error instanceof Error) {
      throw new Error(`Google Sheets API error: ${error.message}`);
    }
    throw new Error('Google Sheets API error: Unknown error occurred');
  }
}
