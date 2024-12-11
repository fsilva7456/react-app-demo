import React, { useState } from 'react';
import IdeaInput from './IdeaInput';
import AnalysisResults from './AnalysisResults';
import { analyzeBusinessIdea } from '../services/openaiService';

const BusinessIdeaAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const analyzeBusiness = async (idea) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Starting analysis with API key:', process.env.REACT_APP_OPENAI_API_KEY ? 'API key exists' : 'No API key found');
      const result = await analyzeBusinessIdea(idea);
      console.log('Analysis result:', result);
      setAnalysis(result);
    } catch (error) {
      console.error('Detailed error:', error);
      setError(
        `Error details: ${error.message || 'Unknown error'}
         Status: ${error?.response?.status || 'N/A'}
         Response: ${JSON.stringify(error?.response?.data) || 'N/A'}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <IdeaInput onSubmit={analyzeBusiness} loading={loading} />
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <pre className="text-red-700 whitespace-pre-wrap">{error}</pre>
        </div>
      )}
      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
};

export default BusinessIdeaAnalyzer;