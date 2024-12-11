import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const REFINEMENT_FOCUSES = [
  'Optimize initial market entry with minimal data requirements while identifying pathways to collect proprietary data',
  'Scale potential - identify ways to expand market size and revenue streams once initial traction is gained',
  'Operational efficiency - streamline processes to reduce ramp-up time and initial resource requirements',
  'Data moat strategy - develop mechanisms to collect and leverage unique data assets for competitive advantage',
  'Network effects - incorporate elements that increase value with each new user/customer'
];

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
            content: `You are a business innovation expert focused on creating highly successful, scalable businesses. Your goal is to help refine business ideas for maximum commercial success while maintaining ease of implementation.

For this iteration, focus especially on: ${REFINEMENT_FOCUSES[i]}

Provide response in JSON format with these fields:
- refinedIdea (string): The improved business concept
- reasoning (string): Why this change increases commercial potential
- improvement (string): Summary of the specific change
- dataStrategy (string): How this iteration improves data collection/usage
- scalingMechanism (string): How this change enables easier scaling
- timeToValue (string): How this change speeds up time to first revenue`
          },
          {
            role: 'user',
            content: `Current business idea: ${currentIdea}${i > 0 ? '\nPrevious refinements: ' + refinements.map(r => r.improvement).join(', ') : ''}
\nOptimize this idea for commercial success, focusing on rapid market entry with minimal initial data requirements while building towards a data-driven competitive advantage.`
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
          content: `You are a business strategy consultant specialized in data-driven businesses. Provide a comprehensive analysis in JSON format with these fields:
- finalIdea (string): The fully refined business concept
- keyRefinements (array of strings): Major improvements made
- dataEvolution (object): {
  initial: string (how to start with minimal data),
  growth: string (how to collect proprietary data),
  maturity: string (how to leverage data moat)
}
- validationSteps (array of objects with "step" and "description" fields)
- marketEntry (object): {
  quickStart: string (fastest path to first revenue),
  scalingTriggers: array of strings (signals that indicate readiness to scale),
  resourceNeeds: string (critical resources needed at each stage)
}
- risks (array of strings)
- competitiveAdvantage (string): How the business becomes increasingly difficult to replicate over time`
          },
          {
            role: 'user',
            content: `Original idea: ${idea}\n\nRefined idea after iterations: ${currentIdea}\n\nRefinement history: ${refinements.map(r => r.improvement).join(', ')}\n\nProvide final analysis focusing on practical implementation and path to market dominance through data advantages.`
          }
        ]
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
