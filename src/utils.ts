import fs from 'fs';

export const encodeImage = (imagePath: string) => {
  const imageFile = fs.readFileSync(imagePath);
  return imageFile.toString('base64');
};

export const isRemoteFile = (filePath: string): boolean => {
  return filePath.startsWith('http://') || filePath.startsWith('https://');
};

export const downloadImageAndEncode = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
};
