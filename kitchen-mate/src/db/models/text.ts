import OpenAI from 'openai';

export async function fetchOpenAICompletionsStream(messages: any[], callback: (chunk: any) => void) {
  const OPENAI_API_KEY = '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';
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  const aiModel = 'gpt-3.5-turbo';
  try {
    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: messages,
      temperature: 1,
      stream: true,
    });

    for await (const chunk of completion) {
      callback(chunk);
    }
  } catch (error) {
    console.error('Error fetching data from OpenAI API:', error);
    throw new Error('Error fetching data from OpenAI API.');
  }
}
