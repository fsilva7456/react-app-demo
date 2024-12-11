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
          content: 'You are a business analyst who helps evaluate business ideas. Provide a balanced analysis with clear pros and cons. Format your response as a JSON object with two arrays: "pros" and "cons".'
        },
        {
          role: 'user',
          content: `Analyze this business idea and provide pros and cons: ${idea}`
        }
      ],
      model: 'gpt-3.5-turbo',  // Changed to gpt-3.5-turbo as it's more widely available
      temperature: 0.7,
    });

    console.log('OpenAI response:', completion.choices[0].message);
    
    // Parse the response content as JSON
    try {
      const analysisText = completion.choices[0].message.content;
      const analysis = JSON.parse(analysisText);
      
      // Validate the response format
      if (!analysis.pros || !analysis.cons) {
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
