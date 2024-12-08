import { describe, it, expect } from 'vitest';
import { ocr } from './index';

const filePath = process.cwd() + '/example/ocr.jpg';

describe('it should works with google', () => {
  it('should return the object for a local file', async () => {
    const result = await ocr({
      filePath: filePath,
      modelID: 'gemini-1.5-flash',
      provider: 'google',
      stream: false,
    });

    expect(result).toBeDefined();
  });

  it('should return the object for a remote file', async () => {
    const result = await ocr({
      filePath: 'https://github.com/patelvivekdev.png',
      modelID: 'gemini-1.5-flash',
      provider: 'google',
      stream: false,
    });

    expect(result).toBeDefined();
  });
});

describe('it should works with mistral', () => {
  it('should return the object for a local file', async () => {
    const result = await ocr({
      filePath: filePath,
      modelID: 'pixtral-large-latest',
      provider: 'mistral',
      stream: false,
    });

    expect(result).toBeDefined();
  });

  it('should return the object for a remote file', async () => {
    const result = await ocr({
      filePath: 'https://github.com/patelvivekdev.png',
      modelID: 'pixtral-12b-2409',
      provider: 'mistral',
      stream: false,
    });

    expect(result).toBeDefined();
  });
});
