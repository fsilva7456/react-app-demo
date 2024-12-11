import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const analyzeBusinessIdea = async (idea) => {
  if (!process.env.REACT_APP_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Please check your .env file.');
  }

  try {
    // First analysis
    const initialAnalysis = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a business analyst who helps evaluate business ideas. Analyze the business idea and provide: 1) A detailed example of how the business would work in practice, 2) A comprehensive list of pros, and 3) A thorough list of cons. Format your response as a JSON object with three properties: "example" (string with a detailed practical example), "pros" (array), and "cons" (array).'
        },
        {
          role: 'user',
          content: `Analyze this business idea and provide a detailed example, pros, and cons: ${idea}`
        }
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    });

    const firstAnalysis = JSON.parse(initialAnalysis.choices[0].message.content);

    // Second analysis to improve the example
    const improvementAnalysis = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a business strategy consultant. Your task is to take a business example and its identified challenges (cons) and provide an improved version of the example that specifically addresses these challenges. Format your response as a JSON object with one property: "improvedExample" (string with the enhanced business example that explains how each con is addressed).'
        },
        {
          role: 'user',
          content: `Original example: ${firstAnalysis.example}\n\nCons to address: ${firstAnalysis.cons.join(', ')}\n\nProvide an improved version of this example that addresses these challenges.`
        }
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    });

    const improvements = JSON.parse(improvementAnalysis.choices[0].message.content);

    return {
      ...firstAnalysis,
      improvedExample: improvements.improvedExample
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error.response) {
      throw new Error(`OpenAI API error: ${error.response.data.error.message}`);
    }
    throw error;
  }
};
