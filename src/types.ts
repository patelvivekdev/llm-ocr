export type GoogleGenerativeAIModelId =
  | 'gemini-1.5-flash'
  | 'gemini-1.5-flash-8b'
  | 'gemini-1.5-pro'
  | (string & {});

export type MistralModelId =
  | 'pixtral-12b-2409'
  | 'pixtral-large-latest'
  | (string & {});

export type ModelId = GoogleGenerativeAIModelId | MistralModelId;

export type Provider = 'google' | 'mistral';

export type OCRObject = {
  filePath: string;
  modelID: ModelId;
  provider: Provider;
  systemPrompt?: string;
  stream?: boolean;
};
