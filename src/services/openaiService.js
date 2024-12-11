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
    let currentIdea = idea;
    let refinements = [];

    // Perform 5 iterations of refinement
    for(let i = 0; i < 5; i++) {
      const refinementResponse = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a business innovation expert. Analyze the business idea and suggest one major refinement that would significantly improve its chances of success. Provide response in JSON format with these fields: refinedIdea (string), reasoning (string), improvement (string).'
          },
          {
            role: 'user',
            content: `Current business idea: ${currentIdea}${i > 0 ? '\nPrevious refinements: ' + refinements.map(r => r.improvement).join(', ') : ''}`
          }
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const refinement = JSON.parse(refinementResponse.choices[0].message.content);
      refinements.push(refinement);
      currentIdea = refinement.refinedIdea;
    }

    // Get final analysis with validation steps
    const finalAnalysis = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a business strategy consultant. Provide a comprehensive analysis of the refined business idea in JSON format with these fields: finalIdea (string), keyRefinements (array of strings explaining major improvements made), validationSteps (array of objects with "step" and "description" fields), marketEntry (string explaining go-to-market strategy), risks (array of strings).'
        },
        {
          role: 'user',
          content: `Original idea: ${idea}\n\nRefined idea after iterations: ${currentIdea}\n\nRefinement history: ${refinements.map(r => r.improvement).join(', ')}\n\nProvide final analysis with validation steps.`
        }
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(finalAnalysis.choices[0].message.content);

    return {
      ...analysis,
      refinementJourney: refinements
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error.response) {
      throw new Error(`OpenAI API error: ${error.response.data.error.message}`);
    }
    throw error;
  }
};
