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
          content: 'You are a business analyst. Provide analysis in JSON format with exactly these fields: example (string), pros (array of strings), and cons (array of strings). No markdown, no extra text, just pure JSON.'
        },
        {
          role: 'user',
          content: `Analyze this business idea with a detailed example, pros, and cons: ${idea}`
        }
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const firstAnalysis = JSON.parse(initialAnalysis.choices[0].message.content);

    // Second analysis to improve the example
    const improvementAnalysis = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a business consultant. Provide response in JSON format with exactly one field: improvedExample (string). This should be a detailed example addressing the provided challenges. No markdown, no extra text, just pure JSON.'
        },
        {
          role: 'user',
          content: `Original example: ${firstAnalysis.example}\n\nAddress these challenges: ${firstAnalysis.cons.join(', ')}\n\nProvide an improved version of this example that addresses these challenges.`
        }
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      response_format: { type: "json_object" }
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
