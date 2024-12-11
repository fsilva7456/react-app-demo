import React from 'react';

const AnalysisResults = ({ analysis }) => {
  return (
    <div className="mt-8 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Analysis Results</h3>
        
        {/* Detailed Example */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="text-blue-800 font-medium mb-2">Detailed Example</h4>
          <p className="text-blue-700 whitespace-pre-wrap">{analysis.example}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Pros */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-green-800 font-medium mb-2">Pros</h4>
            <ul className="list-disc pl-5 space-y-2">
              {analysis.pros.map((pro, index) => (
                <li key={index} className="text-green-700">{pro}</li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="text-red-800 font-medium mb-2">Cons</h4>
            <ul className="list-disc pl-5 space-y-2">
              {analysis.cons.map((con, index) => (
                <li key={index} className="text-red-700">{con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;