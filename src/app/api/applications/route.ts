import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'applications.json');

function readApplications() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeApplications(data: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { businessName, businessType, contactName, phone, email, address, message } = body;

  if (!businessName || !businessType || !contactName || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const application = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    businessName,
    businessType,
    contactName,
    phone,
    email: email || '',
    address: address || '',
    message: message || '',
    createdAt: new Date().toISOString(),
  };

  const applications = readApplications();
  applications.push(application);
  writeApplications(applications);

  return NextResponse.json(application, { status: 201 });
}
