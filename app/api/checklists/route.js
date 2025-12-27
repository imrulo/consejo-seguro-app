import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('-checklist.json'));
  const checklists = files.map(f => {
    const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
    return { name: f.replace('-checklist.json',''), ...JSON.parse(content) };
  });
  return NextResponse.json(checklists);
}
