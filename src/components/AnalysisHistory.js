import React, { useState } from 'react';

const AnalysisHistory = ({ savedAnalyses, onCompare, onLoad }) => {
  const [selectedAnalyses, setSelectedAnalyses] = useState([]);

  const toggleSelect = (analysisId) => {
    setSelectedAnalyses(prev => {
      if (prev.includes(analysisId)) {
        return prev.filter(id => id !== analysisId);
      }
      if (prev.length < 2) {
        return [...prev, analysisId];
      }
      return prev;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Saved Analyses</h3>
        {selectedAnalyses.length === 2 && (
          <button
            onClick={() => onCompare(selectedAnalyses)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Compare Selected
          </button>
        )}
      </div>

      <div className="space-y-4">
        {savedAnalyses.map((analysis) => (
          <div 
            key={analysis.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedAnalyses.includes(analysis.id) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{analysis.ideaTitle}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Analyzed on {new Date(analysis.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onLoad(analysis)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Load
                </button>
                <button
                  onClick={() => toggleSelect(analysis.id)}
                  className={`px-3 py-1 text-sm rounded ${selectedAnalyses.includes(analysis.id) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {selectedAnalyses.includes(analysis.id) ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Market Size:</span>
                <p className="font-medium text-gray-900">${analysis.marketSize}B</p>
              </div>
              <div>
                <span className="text-gray-600">Growth Rate:</span>
                <p className="font-medium text-gray-900">{analysis.growthRate}%</p>
              </div>
              <div>
                <span className="text-gray-600">Confidence:</span>
                <p className="font-medium text-gray-900">{analysis.confidence}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;