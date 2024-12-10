import { ocr } from '../src/index';

const filePath = process.cwd() + '/example/ocr.jpg';

// Example 1: Basic OCR with Google Gemini
async function basicOCR() {
  const result = await ocr({
    filePath: filePath,
    modelID: 'gemini-exp-1206',
    provider: 'google',
    // stream: true,
  });

  return result;
}

const main = async () => {
  const result = await basicOCR();
  // check if the result is an array of strings

  if (typeof result === 'string') {
    console.log(result);
    return;
  }

  for await (const textPart of result) {
    console.log(textPart);
  }
};

main();
