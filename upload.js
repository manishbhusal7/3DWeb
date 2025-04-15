import { put } from '@vercel/blob';
import fs from 'fs';

const filePath = './newroom.glb';
const token = 'JrxQhAlEe4OSJVWYAaHZ6kS5'; // ⚠️ Temp only — revoke after use

try {
  console.log('📤 Reading file...');
  const fileData = fs.readFileSync(filePath);

  console.log('📤 Uploading to Vercel Blob... (this may take up to 1-2 min)');

  const blob = await put('newroom.glb', fileData, {
    access: 'public',
    token,
  });

  console.log('✅ Upload successful!');
  console.log(`🔗 Blob URL: ${blob.url}`);
} catch (error) {
  console.error('❌ Upload failed:', error.message || error);
}
