import React, { useState } from 'react';
import IdeaInput from './IdeaInput';
import AnalysisResults from './AnalysisResults';

const BusinessIdeaAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeBusiness = async (idea) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call to LLM
      const mockAnalysis = {
        pros: [
          'Low initial investment required',
          'Growing market demand',
          'Scalable business model'
        ],
        cons: [
          'High competition',
          'Seasonal fluctuations',
          'Regulatory challenges'
        ]
      };
      
      setTimeout(() => {
        setAnalysis(mockAnalysis);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error analyzing business idea:', error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <IdeaInput onSubmit={analyzeBusiness} loading={loading} />
      {analysis && <AnalysisResults analysis={analysis} />}
    </div>
  );
};

export default BusinessIdeaAnalyzer;