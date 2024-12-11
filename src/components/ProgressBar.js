import React from 'react';

const ProgressBar = ({ currentStep, totalSteps, stages }) => {
  return (
    <div className="w-full py-4">
      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-2 left-0 right-0 h-1 bg-gray-200 rounded"></div>
        
        {/* Active progress */}
        <div 
          className="absolute top-2 left-0 h-1 bg-indigo-600 rounded transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>

        {/* Stage markers */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-indigo-600' : isActive ? 'bg-indigo-400' : 'bg-gray-200'} 
                    ${isActive ? 'ring-4 ring-indigo-100' : ''} transition-all duration-500`}
                ></div>
                <span className={`mt-2 text-xs ${isCompleted || isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;