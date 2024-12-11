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

        {/* Data Evolution Strategy */}
        <div className="bg-violet-50 p-6 rounded-lg mb-8">
          <h4 className="text-violet-900 font-medium mb-4">Data Evolution Strategy</h4>
          <div className="space-y-4">
            <div className="pl-4 border-l-4 border-violet-200">
              <h5 className="text-violet-800 font-medium">Initial Phase</h5>
              <p className="text-violet-700 mt-1">{analysis.dataEvolution.initial}</p>
            </div>
            <div className="pl-4 border-l-4 border-violet-300">
              <h5 className="text-violet-800 font-medium">Growth Phase</h5>
              <p className="text-violet-700 mt-1">{analysis.dataEvolution.growth}</p>
            </div>
            <div className="pl-4 border-l-4 border-violet-400">
              <h5 className="text-violet-800 font-medium">Maturity Phase</h5>
              <p className="text-violet-700 mt-1">{analysis.dataEvolution.maturity}</p>
            </div>
          </div>
        </div>

        {/* Market Entry Strategy */}
        <div className="bg-emerald-50 p-6 rounded-lg mb-8">
          <h4 className="text-emerald-900 font-medium mb-4">Market Entry & Scaling Strategy</h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-emerald-800 font-medium">Quick Start Path</h5>
              <p className="text-emerald-700 mt-1">{analysis.marketEntry.quickStart}</p>
            </div>
            <div>
              <h5 className="text-emerald-800 font-medium">Scaling Triggers</h5>
              <ul className="list-disc pl-5 mt-2">
                {analysis.marketEntry.scalingTriggers.map((trigger, index) => (
                  <li key={index} className="text-emerald-700">{trigger}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-emerald-800 font-medium">Resource Requirements</h5>
              <p className="text-emerald-700 mt-1">{analysis.marketEntry.resourceNeeds}</p>
            </div>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="bg-amber-50 p-6 rounded-lg mb-8">
          <h4 className="text-amber-900 font-medium mb-3">Long-term Competitive Advantage</h4>
          <p className="text-amber-800">{analysis.competitiveAdvantage}</p>
        </div>

        {/* Validation Steps */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h4 className="text-blue-900 font-medium mb-3">Market Validation Plan</h4>
          <ol className="list-decimal pl-5 space-y-4">
            {analysis.validationSteps.map((step, index) => (
              <li key={index} className="text-blue-800">
                <span className="font-medium">{step.step}</span>
                <p className="mt-1 text-blue-700">{step.description}</p>
              </li>
            ))}
          </ol>
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
                <div className="space-y-2">
                  <p className="text-gray-800 font-medium">Improvement:</p>
                  <p className="text-gray-700">{refinement.improvement}</p>
                  <p className="text-gray-800 font-medium mt-3">Data Strategy:</p>
                  <p className="text-gray-700">{refinement.dataStrategy}</p>
                  <p className="text-gray-800 font-medium mt-3">Scaling Mechanism:</p>
                  <p className="text-gray-700">{refinement.scalingMechanism}</p>
                  <p className="text-gray-800 font-medium mt-3">Time to Value:</p>
                  <p className="text-gray-700">{refinement.timeToValue}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;