import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { google, drive_v3 } from 'googleapis';
import { getAuthClient } from './auth';
import { z } from 'zod';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Define Zod Schema based on our data model
const presenterSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  email: z.string().optional(),
  bio: z.string(),
  headshot: z.string(),
  proudestAccomplishment: z.string(),
  lessonLearned: z.string(),
  project: z.object({
    name: z.string(),
    tagline: z.string(),
    category: z.string(),
    targetAudience: z.string(),
    problem: z.string(),
    keyFeatures: z.array(z.string()),
    biggestChallenge: z.string(),
    futurePlans: z.string().optional(),
    techStack: z.array(z.string()),
    aiUsage: z.array(z.string()),
    liveUrl: z.string(),
    repositoryUrl: z.string(),
    requiresLogin: z.boolean(),
    demoCredentials: z.object({ username: z.string(), password: z.string() }).optional(),
    screenshots: z.object({
      desktop: z.string(),
      mobile: z.string(),
    }),
  }),
  links: z.object({
    github: z.string(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
  }),
  publishing: z.object({
    approved: z.boolean(),
    displayOrder: z.number(),
    permissions: z.array(z.string()),
  }),
});

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function extractDriveId(url: string) {
  const match = url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function isPublicImageUrl(url: string) {
  return typeof url === 'string' && /^(https?:\/\/).+\.(png|jpe?g|webp|avif|gif|svg)$/i.test(url.trim());
}

async function downloadAndOptimizeImage(drive: drive_v3.Drive, fileId: string, destPath: string, accessToken: string) {
  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Google Drive API error (${res.status}): ${text.slice(0, 300)}`);
      return false;
    }

    const buffer = await res.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);
    
    // Optimize with sharp
    await sharp(nodeBuffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destPath);
      
    return true;
  } catch (error) {
    console.error(`Failed to download/optimize image ${fileId}:`, error);
    return false;
  }
}

async function main() {
  console.log('Starting Presenter Import...');
  
  if (!SHEET_ID) {
    console.error('Error: GOOGLE_SHEET_ID is missing in .env.local');
    process.exit(1);
  }

  const authClient = await getAuthClient();
  const token = await authClient.getAccessToken();
  const sheets = google.sheets({ version: 'v4' });
  const drive = google.drive({ version: 'v3' });

  console.log('Fetching Google Sheet...');
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Form Responses 1',
    access_token: token.token as string
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) {
    console.log('No data rows found.');
    return;
  }

  const headers = rows[0] || [];
  const findColumn = (pattern: RegExp, fallback: number) => {
    const idx = headers.findIndex((h: string) => pattern.test(String(h).trim()));
    return idx >= 0 ? idx : fallback;
  };

  const bookingHeaderIndex = findColumn(/booking|calendly|booking link|booking_url|bookingurl/i, -1);
  const heroGraphicHeaderIndex = findColumn(/hero.*graphic|hero.*image|hero graphic|hero image/i, 28);
  const desktopOriginalHeaderIndex = findColumn(/desktop.*screenshot|desktop screenshot|desktop/i, 29);
  const mobileOriginalHeaderIndex = findColumn(/mobile.*screenshot|mobile screenshot|mobile/i, 30);
  const desktopReplacementHeaderIndex = findColumn(/replacement.*desktop|desktop.*replacement|replacement desktop/i, -1);
  const mobileReplacementHeaderIndex = findColumn(/replacement.*mobile|mobile.*replacement|replacement mobile/i, -1);

  const presenters = [];
  
  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public', 'presenters');
  await fs.mkdir(publicDir, { recursive: true });

  // Skip header row (index 0)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    
    // Map columns based on the discovered headers
    const name = row[2] || '';
    const slug = generateSlug(name);
    
    if (!name) continue; // skip empty rows

    console.log(`Processing presenter: ${name}`);

    // Create presenter directory for assets
    const presenterDir = path.join(publicDir, slug);
    await fs.mkdir(presenterDir, { recursive: true });

    // Handle Headshot download
    let headshotPath = '';
    const headshotUrl = row[4];
    if (headshotUrl) {
      const driveId = extractDriveId(headshotUrl);
      if (driveId && token.token) {
        const dest = path.join(presenterDir, 'headshot.webp');
        const success = await downloadAndOptimizeImage(drive, driveId, dest, token.token);
        if (success) {
          headshotPath = `/presenters/${slug}/headshot.webp`;
        }
      }
    }

    // Handle Hero Graphic download
    let heroGraphicPath = '';
    const heroGraphicUrl = row[heroGraphicHeaderIndex];
    if (heroGraphicUrl) {
      const driveId = extractDriveId(heroGraphicUrl);
      if (driveId && token.token) {
        const dest = path.join(presenterDir, 'hero-graphic.webp');
        const success = await downloadAndOptimizeImage(drive, driveId, dest, token.token);
        if (success) {
          heroGraphicPath = `/presenters/${slug}/hero-graphic.webp`;
        }
      }
    }

    // Determine desktop screenshot source: replacement URL wins over the original Drive upload.
    let desktopPath = '';
    const desktopReplacementUrl = desktopReplacementHeaderIndex >= 0 ? (row[desktopReplacementHeaderIndex] || '') : '';
    const desktopOriginalUrl = row[desktopOriginalHeaderIndex];
    if (desktopReplacementUrl && isPublicImageUrl(desktopReplacementUrl)) {
      desktopPath = desktopReplacementUrl.trim();
    } else if (desktopOriginalUrl) {
      const driveId = extractDriveId(desktopOriginalUrl);
      if (driveId && token.token) {
        const dest = path.join(presenterDir, 'desktop.webp');
        const success = await downloadAndOptimizeImage(drive, driveId, dest, token.token);
        if (success) {
          desktopPath = `/presenters/${slug}/desktop.webp`;
        }
      }
    }

    // Determine mobile screenshot source: replacement URL wins over the original Drive upload.
    let mobilePath = '';
    const mobileReplacementUrl = mobileReplacementHeaderIndex >= 0 ? (row[mobileReplacementHeaderIndex] || '') : '';
    const mobileOriginalUrl = row[mobileOriginalHeaderIndex];
    if (mobileReplacementUrl && isPublicImageUrl(mobileReplacementUrl)) {
      mobilePath = mobileReplacementUrl.trim();
    } else if (mobileOriginalUrl) {
      const driveId = extractDriveId(mobileOriginalUrl);
      if (driveId && token.token) {
        const dest = path.join(presenterDir, 'mobile.webp');
        const success = await downloadAndOptimizeImage(drive, driveId, dest, token.token);
        if (success) {
          mobilePath = `/presenters/${slug}/mobile.webp`;
        }
      }
    }

    // Parse features (combining the 3 columns)
    const keyFeatures = [row[11], row[12], row[13]].filter(Boolean);

    // Capture optional booking link if the form includes that column
    const bookingLink = bookingHeaderIndex >= 0 ? (row[bookingHeaderIndex] || '') : '';

    // Parse credentials if needed
    const requiresLogin = row[21] && row[21].toLowerCase().includes('yes');
    let demoCredentials = undefined;
    if (requiresLogin && row[22]) {
      // Very basic split assuming format "username - password"
      const parts = row[22].split('-');
      if (parts.length >= 2) {
        demoCredentials = {
          username: parts[0].trim(),
          password: parts.slice(1).join('-').trim()
        };
      }
    }

    const rawPresenter = {
      id: slug,
      slug,
      name,
      bio: row[5] || '',
      headshot: headshotPath,
      project: {
        name: row[6] || '',
        tagline: row[7] || '',
        category: row[8] || '',
        targetAudience: row[9] || '',
        problem: row[10] || '',
        keyFeatures,
        biggestChallenge: row[14] || '',
        futurePlans: row[15] || '',
        techStack: (row[18] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
        aiUsage: (row[16] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
        liveUrl: row[23] || '',
        repositoryUrl: row[24] || '',
        requiresLogin: !!requiresLogin,
        demoCredentials,
        screenshots: {
          desktop: desktopPath,
          mobile: mobilePath,
        },
        heroGraphic: heroGraphicPath || undefined,
        bookingLink: bookingLink || undefined,
      },
      proudestAccomplishment: row[19] || '',
      lessonLearned: row[20] || '',
      links: {
        github: row[25] || '',
        linkedin: row[26] || '',
        portfolio: row[27] || '',
      },
      publishing: {
        approved: true,
        displayOrder: 0,
        permissions: [],
      }
    };

    try {
      const validated = presenterSchema.parse(rawPresenter);
      presenters.push(validated);
    } catch (err) {
      console.error(`Validation failed for ${name}:`, err);
    }
  }

  // Write JSON output
  const dataDir = path.join(process.cwd(), 'src', 'data');
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(
    path.join(dataDir, 'presenters.json'),
    JSON.stringify(presenters, null, 2)
  );

  console.log(`\nImport complete! Processed ${presenters.length} presenters.`);
  console.log(`Data saved to src/data/presenters.json`);
}

main().catch(console.error);
