import React from 'react';

const TrendCard = ({ trend }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-start justify-between">
      <div>
        <h4 className="font-medium text-gray-900">{trend.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{trend.description}</p>
      </div>
      <span className={`px-2 py-1 rounded text-sm ${trend.impact === 'high' ? 'bg-red-100 text-red-800' : trend.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
        {trend.impact.charAt(0).toUpperCase() + trend.impact.slice(1)} Impact
      </span>
    </div>
    <div className="mt-4">
      <div className="text-sm text-gray-500">Adoption Timeline</div>
      <div className="mt-1 h-2 bg-gray-200 rounded">
        <div 
          className="h-2 bg-blue-600 rounded" 
          style={{ width: `${trend.adoption}%` }}
        ></div>
      </div>
      <div className="mt-1 text-xs text-gray-500">{trend.adoption}% adoption</div>
    </div>
  </div>
);

const IndustryResearch = ({ industryData }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Industry Research</h3>
      
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-indigo-800">Industry Size</h4>
          <p className="text-2xl font-bold text-indigo-900">${industryData.size}B</p>
          <p className="text-sm text-indigo-600">Global market value</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">CAGR</h4>
          <p className="text-2xl font-bold text-green-900">{industryData.cagr}%</p>
          <p className="text-sm text-green-600">5-year growth rate</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Market Maturity</h4>
          <p className="text-2xl font-bold text-purple-900">{industryData.maturity}</p>
          <p className="text-sm text-purple-600">Current phase</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-amber-800">Innovation Index</h4>
          <p className="text-2xl font-bold text-amber-900">{industryData.innovationIndex}/10</p>
          <p className="text-sm text-amber-600">Technology adoption rate</p>
        </div>
      </div>

      {/* Market Leaders */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="font-medium text-gray-800 mb-4">Market Leaders</h4>
        <div className="space-y-4">
          {industryData.leaders.map((leader, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{leader.name}</p>
                  <p className="text-sm text-gray-500">{leader.specialty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${leader.revenue}M</p>
                <p className="text-sm text-gray-500">Annual Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Trends */}
      <div>
        <h4 className="font-medium text-gray-800 mb-4">Key Trends</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryData.trends.map((trend, index) => (
            <TrendCard key={index} trend={trend} />
          ))}
        </div>
      </div>

      {/* Regulatory Environment */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="font-medium text-gray-800 mb-4">Regulatory Environment</h4>
        <div className="space-y-4">
          {industryData.regulations.map((reg, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-medium text-gray-900">{reg.name}</h5>
              <p className="text-sm text-gray-600 mt-1">{reg.description}</p>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-sm text-gray-500">Impact: {reg.impact}</span>
                <span className="text-sm text-gray-500">Region: {reg.region}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryResearch;