import React from 'react';

const PhaseCard = ({ phase, isActive }) => (
  <div className={`p-4 rounded-lg ${isActive ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border border-gray-200'}`}>
    <h4 className={`font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'} mb-2`}>{phase.name}</h4>
    <p className={`text-sm ${isActive ? 'text-blue-700' : 'text-gray-600'} mb-4`}>{phase.description}</p>
    
    <div className="space-y-3">
      <div>
        <h5 className="text-sm font-medium mb-1">Data Collection</h5>
        <ul className="text-sm space-y-1">
          {phase.dataCollection.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-sm font-medium mb-1">Key Metrics</h5>
        <ul className="text-sm space-y-1">
          {phase.metrics.map((metric, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              <span>{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      {phase.insights && (
        <div>
          <h5 className="text-sm font-medium mb-1">Expected Insights</h5>
          <ul className="text-sm space-y-1">
            {phase.insights.map((insight, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Complexity:</span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`w-4 h-1 rounded ${i < phase.complexity ? 'bg-blue-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DataEvolutionStrategy = ({ strategy, currentPhase = 0 }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Data Evolution Strategy</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Current Phase:</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {strategy[currentPhase].name}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded"></div>
        <div 
          className="absolute top-0 left-0 h-1 bg-blue-500 rounded transition-all duration-500"
          style={{ width: `${((currentPhase + 1) / strategy.length) * 100}%` }}
        ></div>
        <div className="relative flex justify-between pt-4">
          {strategy.map((_, index) => (
            <div 
              key={index}
              className={`w-4 h-4 rounded-full ${index <= currentPhase ? 'bg-blue-500' : 'bg-gray-200'} 
                transition-all duration-500`}
            />
          ))}
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {strategy.map((phase, index) => (
          <PhaseCard 
            key={index}
            phase={phase}
            isActive={index === currentPhase}
          />
        ))}
      </div>
    </div>
  );
};

export default DataEvolutionStrategy;