import { fetchOpenAICompletionsStream } from '@/db/models/generate';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
      console.log('Request Query:<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', req.query);
      const ingredients = req.query.ingredients as string;
      const mealType = req.query.mealType as string;
      const cuisine = req.query.cuisine as string;
      const cookingTime = req.query.cookingTime as string;
      const complexity = req.query.complexity as string;


      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');


      const sendEvent = (chunk: any) => {
        let chunkResponse;
        if (chunk.choices[0].finish_reason === 'stop') {
          res.write(`data: ${JSON.stringify({ action: 'close' })}\n\n`);
        } else {
          if (chunk.choices[0].delta.role && chunk.choices[0].delta.role === 'assistant') {
            chunkResponse = {
              action: 'start',
            };
          } else {
            chunkResponse = {
              action: 'chunk',
              chunk: chunk.choices[0].delta.content,
            };
          }
          res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`);
        }
      };

      const prompt = [];
      prompt.push('Generate a recipe that incorporates the following details:');
      prompt.push(`[Ingredients: ${ingredients}]`);
      prompt.push(`[Meal Type: ${mealType}]`);
      prompt.push(`[Cuisine Preference: ${cuisine}]`);
      prompt.push(`[Cooking Time: ${cookingTime}]`);
      prompt.push(`[Complexity: ${complexity}]`);
      prompt.push(
        'Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided.'
      );
      prompt.push('The recipe should highlight the fresh and vibrant flavors of the ingredients.');
      prompt.push('Also give the recipe a suitable name in its local language based on cuisine preference.');

      const messages = [
        {
          role: 'system',
          content: prompt.join(' '),
        },
      ];
      await fetchOpenAICompletionsStream(messages, sendEvent);

      req.on('close', () => {
        res.end();
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
