# LLM-OCR

A simple OCR SDK that uses AI models to extract text from images and return formatted markdown.

## Features

- [x] Support for multiple AI providers (Google Gemini, Mistral)
- [x] Local and remote image processing
- [x] Streaming and non-streaming responses
- [x] Base64 image encoding
- [x] Markdown formatted output
- [ ] additional provider support with models
- [ ] additional output formats (JSON)
- [ ] support for pdf files
- [ ] support for Multi-page PDF files

## Installation

```bash
npm install llm-ocr
# or
yarn add llm-ocr
# or
pnpm add llm-ocr
# or
bun add llm-ocr
```

## Environment Variables

Create a `.env` file and add your API keys:

```env
GOOGLE_API_KEY=your_google_api_key
MISTRAL_API_KEY=your_mistral_api_key
```

## Usage

### Basic Example

```typescript
import { ocr } from 'llm-ocr';

// For local image
const result = await ocr({
  filePath: './path/to/image.jpg',
  modelID: 'gemini-1.5-flash',
  provider: 'google',
  stream: false,
  // systemPrompt: 'What is the text in the image?', // Optional
});

// For remote image
const result = await ocr({
  filePath: 'https://example.com/image.jpg',
  modelID: 'pixtral-large-latest',
  provider: 'mistral',
  stream: false,
});
```

### Available Models

Google Models:

- gemini-1.5-flash `fast but less accurate`
- gemini-1.5-flash-8b `fast but less accurate`
- gemini-1.5-pro `accurate but slow`

Mistral Models:

- pixtral-12b-2409 `fast but less accurate`
- pixtral-large-latest `accurate but slow`

### Utility Functions

```typescript
import { encodeImage, isRemoteFile, downloadImageAndEncode } from 'llm-ocr';

// Encode local image to base64
const base64Image = encodeImage('./path/to/image.jpg');

// Check if file is remote
const isRemote = isRemoteFile('https://example.com/image.jpg');

// Download and encode remote image
const encodedRemoteImage = await downloadImageAndEncode(
  'https://example.com/image.jpg',
);
```

## License

MIT © [Vivek Patel](https://github.com/patelvivekdev)
