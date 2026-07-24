import * as dotenv from 'dotenv';
import path from 'path';
import { google } from 'googleapis';
import { getAuthClient } from './auth';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function main() {
  console.log('Authenticating with Google...');
  const authClient = await getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  console.log('Fetching headers from Google Sheet...');
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'A1:Z1', 
  });

  const headers = response.data.values?.[0];
  if (!headers) {
    console.log('No headers found.');
    return;
  }

  console.log('Found Headers:');
  headers.forEach((h, i) => {
    console.log(`Column ${i}: ${h}`);
  });
}

main().catch(console.error);
