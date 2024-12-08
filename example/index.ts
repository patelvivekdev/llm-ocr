import { ocr } from '../src/index';

const filePath = process.cwd() + '/example/ocr.jpg';

// Example 1: Basic OCR with Google Gemini
async function basicOCR() {
  const result = await ocr({
    filePath: filePath,
    modelID: 'gemini-exp-1206',
    provider: 'google',
    stream: false,
  });

  return result;
}

const main = async () => {
  const result = await basicOCR();
  console.log(result);
};

main();
