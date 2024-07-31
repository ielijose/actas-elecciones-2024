import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
    }

    const filePath = path.join(uploadDir, file.name);
    const fileStream = fs.createWriteStream(filePath);
    const reader = file.stream().getReader();

    const pump = async () => {
      const { done, value } = await reader.read();
      if (done) {
        fileStream.end();
        return;
      }
      fileStream.write(value);
      await pump();
    };

    await pump();

    // Here you can add additional logic to handle the uploaded file, e.g., save to a database

    return NextResponse.json({ message: 'File uploaded successfully', filePath }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error uploading file' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
