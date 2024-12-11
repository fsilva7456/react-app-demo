import React, { useState } from 'react';

const AnalysisResults = ({ analysis }) => {
  const [showRefinements, setShowRefinements] = useState(false);

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h3 className="text-xl font-medium text-gray-900 mb-6">Final Analysis</h3>
        
        {/* Final Refined Idea */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 shadow-sm">
          <h4 className="text-lg text-indigo-900 font-medium mb-3">Refined Business Model</h4>
          <p className="text-indigo-800 whitespace-pre-wrap">{analysis.finalIdea}</p>
        </div>

        {/* Key Refinements */}
        <div className="bg-amber-50 p-6 rounded-lg mb-8">
          <h4 className="text-amber-900 font-medium mb-3">Key Improvements Made</h4>
          <ul className="list-disc pl-5 space-y-2">
            {analysis.keyRefinements.map((refinement, index) => (
              <li key={index} className="text-amber-800">{refinement}</li>
            ))}
          </ul>
        </div>

        {/* Validation Steps */}
        <div className="bg-emerald-50 p-6 rounded-lg mb-8">
          <h4 className="text-emerald-900 font-medium mb-3">Market Validation Plan</h4>
          <ol className="list-decimal pl-5 space-y-4">
            {analysis.validationSteps.map((step, index) => (
              <li key={index} className="text-emerald-800">
                <span className="font-medium">{step.step}</span>
                <p className="mt-1 text-emerald-700">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Market Entry Strategy */}
        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h4 className="text-purple-900 font-medium mb-3">Go-to-Market Strategy</h4>
          <p className="text-purple-800 whitespace-pre-wrap">{analysis.marketEntry}</p>
        </div>

        {/* Risks */}
        <div className="bg-red-50 p-6 rounded-lg mb-8">
          <h4 className="text-red-900 font-medium mb-3">Key Risks to Consider</h4>
          <ul className="list-disc pl-5 space-y-2">
            {analysis.risks.map((risk, index) => (
              <li key={index} className="text-red-800">{risk}</li>
            ))}
          </ul>
        </div>

        {/* Refinement Journey Button */}
        <button
          onClick={() => setShowRefinements(!showRefinements)}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          <span className="font-medium">
            {showRefinements ? '▼' : '▶'} View Refinement Journey
          </span>
        </button>

        {/* Refinement Journey Details */}
        {showRefinements && (
          <div className="mt-4 space-y-4">
            {analysis.refinementJourney.map((refinement, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">Iteration {index + 1}</h5>
                <p className="text-gray-800 mb-2">{refinement.improvement}</p>
                <p className="text-gray-600 text-sm">{refinement.reasoning}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;