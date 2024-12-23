import { generateText, smoothStream, streamText, type CoreMessage } from 'ai';
import { selectModel } from './ai';
import { encodeImage, isRemoteFile } from './utils';
import { SYSTEM_PROMPT } from './prompt';
import type { OCRObject } from './types';

/**
 * Perform OCR on the given image file.
 * @param OCRObject - The OCR object.
 * - filePath - The path to the image file or a buffer of the image.
 * - modelID - The model ID to use for OCR (default: 'gemini-1.5-flash-8b').
 * - provider - The provider to use for OCR (default: 'google').
 * - stream - Whether to stream the OCR result (default: false).
 * - systemPrompt - The system prompt to use for the AI model.
 * - smoothStreamDelay - The delay in milliseconds for smoothing the stream.
 * @returns The OCR result as a string or stream of strings.
 */

export const ocr = async ({
  filePath,
  modelID,
  provider,
  stream,
  systemPrompt,
  smoothStreamDelay,
}: OCRObject) => {
  if (!filePath) {
    throw new Error('Please provide a file path.');
  }

  let finalImageUrl = '';

  if (typeof filePath === 'string') {
    finalImageUrl = isRemoteFile(filePath)
      ? filePath
      : `data:image/jpeg;base64,${encodeImage(filePath)}`;
  } else {
    finalImageUrl = `data:image/jpeg;base64,${filePath.toString('base64')}`;
  }

  const model = await selectModel(
    modelID ?? 'gemini-1.5-flash-8b',
    provider ?? 'google',
  );
  const system = systemPrompt ?? SYSTEM_PROMPT;

  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: system,
        },
        {
          type: 'image',
          image: finalImageUrl,
        },
      ],
    },
  ] as CoreMessage[];

  if (stream) {
    const textStream = streamText({
      model,
      system,
      messages,
      temperature: 0.1,
      experimental_transform: smoothStream({
        delayInMs: smoothStreamDelay ?? 10,
      }),
    });

    return textStream.textStream;
  }

  const { text } = await generateText({
    model: await selectModel(modelID, provider),
    messages,
    temperature: 0.1,
  });

  return text;
};
