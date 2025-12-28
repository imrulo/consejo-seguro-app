import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dataDir = path.join(process.cwd(), 'data');
  const filenamePattern = /^[a-zA-Z0-9_-]+-checklist\.json$/;
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('-checklist.json'));
  const checklists = [];
  for (const f of files) {
    if (!filenamePattern.test(f)) continue;
    const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
    checklists.push({ name: f.replace('-checklist.json',''), ...JSON.parse(content) });
  }
  return NextResponse.json(checklists);
}
