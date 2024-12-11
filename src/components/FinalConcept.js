import React from 'react';

const FeatureCard = ({ title, description, impact }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <h4 className="text-gray-900 font-medium">{title}</h4>
    <p className="text-gray-600 mt-1 text-sm">{description}</p>
    <div className="mt-3 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full inline-block">
      Impact: {impact}
    </div>
  </div>
);

const WhyItWorksPoint = ({ title, explanation }) => (
  <div className="border-l-4 border-green-500 pl-4 py-2">
    <h4 className="text-gray-900 font-medium">{title}</h4>
    <p className="text-gray-600 mt-1">{explanation}</p>
  </div>
);

const FinalConcept = ({ concept }) => {
  const {
    refinedIdea,
    keyFeatures = [],
    whyItWorks = [],
    uniqueValue,
    targetCustomer,
    successMetrics = [],
    earlyValidation = []
  } = concept || {};

  return (
    <div className="space-y-8">
      {/* Refined Pitch */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Refined Business Concept</h3>
        <p className="text-gray-800 text-lg leading-relaxed">{refinedIdea}</p>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features & Differentiators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Why It Works */}
      <div className="bg-green-50 p-6 rounded-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Why This Will Succeed</h3>
        <div className="space-y-4">
          {whyItWorks.map((point, index) => (
            <WhyItWorksPoint key={index} {...point} />
          ))}
        </div>
      </div>

      {/* Target Customer & Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Target Customer</h3>
          <p className="text-gray-800">{targetCustomer}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Unique Value Proposition</h3>
          <p className="text-gray-800">{uniqueValue}</p>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Success Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {successMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-gray-700 font-medium">{metric.name}</h4>
              <p className="text-gray-600 text-sm mt-1">{metric.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Early Validation Steps */}
      <div className="bg-amber-50 p-6 rounded-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Validation Plan</h3>
        <ol className="list-decimal list-inside space-y-3">
          {earlyValidation.map((step, index) => (
            <li key={index} className="text-gray-800">
              <span className="font-medium">{step.what}</span>
              <p className="text-gray-600 ml-6 mt-1">{step.how}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default FinalConcept;