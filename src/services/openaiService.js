import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend server
});

export const analyzeBusinessIdea = async (idea) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a business analyst who helps evaluate business ideas. Provide a balanced analysis with clear pros and cons. Format your response as a JSON object with two arrays: "pros" and "cons".'
        },
        {
          role: 'user',
          content: `Analyze this business idea and provide pros and cons: ${idea}`
        }
      ],
      model: 'gpt-4',
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw new Error('Failed to analyze business idea');
  }
};