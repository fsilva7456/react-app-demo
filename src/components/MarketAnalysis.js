import React from 'react';

const MarketAnalysis = ({ marketData }) => {
  const {
    totalMarketSize,
    targetMarketSize,
    growthRate,
    competitiveLandscape,
    revenueModel,
    costStructure
  } = marketData;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Market Analysis</h3>
      
      {/* Market Size Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800">Total Market Size</h4>
          <p className="text-2xl font-bold text-blue-900">${totalMarketSize}B</p>
          <p className="text-sm text-blue-600">Annual market value</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-800">Target Market</h4>
          <p className="text-2xl font-bold text-green-900">${targetMarketSize}B</p>
          <p className="text-sm text-green-600">Serviceable market</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800">Growth Rate</h4>
          <p className="text-2xl font-bold text-purple-900">{growthRate}%</p>
          <p className="text-sm text-purple-600">Annual growth</p>
        </div>
      </div>

      {/* Competitive Analysis */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Competitive Landscape</h4>
        <div className="space-y-2">
          {competitiveLandscape.map((competitor, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700">{competitor.name}</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 rounded-full h-2" 
                  style={{ width: `${competitor.marketShare}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{competitor.marketShare}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-yellow-800 mb-3">Revenue Streams</h4>
          <ul className="space-y-2">
            {revenueModel.streams.map((stream, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-yellow-900">{stream.name}</span>
                <span className="text-yellow-700">${stream.potential}K/year</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-red-800 mb-3">Cost Structure</h4>
          <ul className="space-y-2">
            {costStructure.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span className="text-red-900">{item.name}</span>
                <span className="text-red-700">${item.amount}K/year</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;