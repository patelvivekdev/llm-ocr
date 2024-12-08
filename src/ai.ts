import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createMistral } from '@ai-sdk/mistral';
import { config } from 'dotenv';
import type { ModelId, Provider } from './types';

config({ path: '.env' });

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const selectModel = async (
  modelID: ModelId = 'gemini-1.5-flash-8b',
  provider: Provider = 'google',
) => {
  if (provider === 'google') {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error(
        'Missing Google API key. Please set GOOGLE_API_KEY in .env',
      );
    }
    return google(modelID);
  } else if (provider === 'mistral') {
    if (!process.env.MISTRAL_API_KEY) {
      throw new Error(
        'Missing Mistral API key. Please set MISTRAL_API_KEY in .env',
      );
    }
    return mistral(modelID);
  }

  throw new Error('Invalid provider');
};
