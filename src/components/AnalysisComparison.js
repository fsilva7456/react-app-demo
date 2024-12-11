import React from 'react';

const ComparisonMetric = ({ label, value1, value2 }) => {
  const difference = value2 - value1;
  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600 w-1/4">{label}</span>
      <div className="grid grid-cols-2 gap-4 w-3/4">
        <div className="text-right">{value1}</div>
        <div className="flex items-center space-x-2">
          <span>{value2}</span>
          {difference !== 0 && (
            <span className={`text-sm ${difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
              ({difference > 0 ? '+' : ''}{difference})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const AnalysisComparison = ({ analyses }) => {
  if (!analyses || analyses.length !== 2) return null;

  const [analysis1, analysis2] = analyses;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Analysis Comparison</h3>
      
      {/* Headers */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-2">Metric</div>
        <div className="text-right">{analysis1.ideaTitle}</div>
        <div>{analysis2.ideaTitle}</div>
      </div>

      {/* Market Metrics */}
      <div className="space-y-4 mb-8">
        <h4 className="font-medium text-gray-700">Market Metrics</h4>
        <ComparisonMetric
          label="Market Size"
          value1={`$${analysis1.marketSize}B`}
          value2={`$${analysis2.marketSize}B`}
        />
        <ComparisonMetric
          label="Growth Rate"
          value1={`${analysis1.growthRate}%`}
          value2={`${analysis2.growthRate}%`}
        />
        <ComparisonMetric
          label="Confidence"
          value1={`${analysis1.confidence}%`}
          value2={`${analysis2.confidence}%`}
        />
      </div>

      {/* Revenue Potential */}
      <div className="space-y-4 mb-8">
        <h4 className="font-medium text-gray-700">Revenue Potential</h4>
        {analysis1.revenueModel?.streams.map((stream, index) => (
          <ComparisonMetric
            key={index}
            label={stream.name}
            value1={`$${stream.potential}K`}
            value2={`$${analysis2.revenueModel.streams[index].potential}K`}
          />
        ))}
      </div>

      {/* Implementation Timeline */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-4">Recommendation</h4>
        <p className="text-gray-600">
          Based on the comparison, {analysis1.marketSize > analysis2.marketSize ? analysis1.ideaTitle : analysis2.ideaTitle} shows 
          stronger market potential with {Math.max(analysis1.growthRate, analysis2.growthRate)}% growth rate and 
          higher confidence score of {Math.max(analysis1.confidence, analysis2.confidence)}%.
        </p>
      </div>
    </div>
  );
};

export default AnalysisComparison;