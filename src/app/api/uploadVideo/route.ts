import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

const bucketName = process.env.GOOGLE_BUCKET_NAME;
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;



if (!serviceAccountJson) {
  throw new Error('Environment variable GOOGLE_SERVICE_ACCOUNT_JSON is not defined');
}

const serviceAccount = JSON.parse(serviceAccountJson);

const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const cedula = formData.get('cedula') as string;

    if (!file) {
      return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
    }

    if (!cedula) {
      return NextResponse.json({ message: 'Cedula is required' }, { status: 400 });
    }

    // Sanitize file name
    const sanitizedFileName = path.basename(file.name);
    const videoPath = `videos/${cedula}/${sanitizedFileName}`;

    if (!bucketName) {
      throw new Error('Environment variable GOOGLE_BUCKET_NAME is not defined');
    }
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(videoPath);
    const blobStream = blob.createWriteStream();

    const reader = file.stream().getReader();

    const pump = async () => {
      const { done, value } = await reader.read();
      if (done) {
        blobStream.end();
        return;
      }
      blobStream.write(value);
      await pump();
    };

    await pump();

    return NextResponse.json({ message: 'File uploaded successfully', filePath: `gs://${bucketName}/${videoPath}` }, { status: 200 });
  } catch (err) {
    console.error('Error uploading file:', err);
    // @ts-ignore
    return NextResponse.json({ message: 'Error uploading file', error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
