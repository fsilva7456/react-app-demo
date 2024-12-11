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
    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
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

    console.log('OpenAI response:', completion.choices[0].message);
    
    try {
      const analysisText = completion.choices[0].message.content;
      const analysis = JSON.parse(analysisText);
      
      if (!analysis.pros || !analysis.cons || !analysis.example) {
        throw new Error('Invalid response format from OpenAI');
      }
      
      return analysis;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.log('Raw response:', completion.choices[0].message.content);
      throw new Error('Failed to parse OpenAI response');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error.response) {
      throw new Error(`OpenAI API error: ${error.response.data.error.message}`);
    }
    throw error;
  }
};
