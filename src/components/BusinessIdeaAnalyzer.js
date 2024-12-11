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
      const result = await analyzeBusinessIdea(idea);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing business idea:', error);
      setError('Failed to analyze business idea. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <IdeaInput onSubmit={analyzeBusiness} loading={loading} />
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
};

export default BusinessIdeaAnalyzer;