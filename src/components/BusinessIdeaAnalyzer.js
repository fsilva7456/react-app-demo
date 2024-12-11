import React, { useState } from 'react';
import IdeaInput from './IdeaInput';
import MarketAnalysis from './MarketAnalysis';
import IndustryResearch from './IndustryResearch';
import DataEvolutionStrategy from './DataEvolutionStrategy';
import FinalConcept from './FinalConcept';
import { analyzeBusinessIdea } from '../services/openaiService';

// Mock Market Data
const MOCK_MARKET_DATA = {
  totalMarketSize: 10,
  targetMarketSize: 3,
  growthRate: 15,
  competitiveLandscape: [
    { name: 'Market Leader', marketShare: 45 },
    { name: 'Key Competitor', marketShare: 30 },
    { name: 'Others', marketShare: 25 }
  ],
  revenueModel: {
    streams: [
      { name: 'Primary Revenue', potential: 500 },
      { name: 'Secondary Revenue', potential: 300 }
    ]
  },
  costStructure: {
    items: [
      { name: 'Development', amount: 200 },
      { name: 'Marketing', amount: 150 },
      { name: 'Operations', amount: 100 }
    ]
  }
};

// Mock Industry Data
const MOCK_INDUSTRY_DATA = {
  size: 150,
  cagr: 15.5,
  maturity: 'Growth',
  innovationIndex: 8,
  leaders: [
    { name: 'TechCorp', specialty: 'Enterprise Solutions', revenue: 500 },
    { name: 'DataCo', specialty: 'Analytics Platform', revenue: 350 },
    { name: 'AITech', specialty: 'ML Infrastructure', revenue: 280 }
  ],
  trends: [
    {
      title: 'AI Integration',
      description: 'Increasing adoption of AI and ML technologies in core products',
      impact: 'high',
      adoption: 65
    },
    {
      title: 'Privacy Focus',
      description: 'Enhanced data privacy and security measures',
      impact: 'medium',
      adoption: 80
    }
  ],
  regulations: [
    {
      name: 'Data Protection Act',
      description: 'Comprehensive data privacy and security requirements',
      impact: 'High',
      region: 'Global'
    },
    {
      name: 'AI Governance Framework',
      description: 'Guidelines for responsible AI development and deployment',
      impact: 'Medium',
      region: 'EU/US'
    }
  ]
};

// Mock Data Strategy
const MOCK_DATA_STRATEGY = [
  {
    name: 'Initial Data Collection',
    description: 'Start with minimal but essential data collection to validate core assumptions',
    dataCollection: [
      'User behavior basics',
      'Transaction logs',
      'Basic feedback'
    ],
    metrics: [
      'User engagement',
      'Conversion rate',
      'User retention'
    ],
    insights: [
      'Usage patterns',
      'Initial pain points'
    ],
    complexity: 2
  },
  {
    name: 'Enhanced Analytics',
    description: 'Expand data collection and begin advanced analytics',
    dataCollection: [
      'Detailed user journey',
      'Feature usage metrics',
      'Customer feedback analysis'
    ],
    metrics: [
      'Feature adoption rates',
      'Customer satisfaction score',
      'Churn prediction'
    ],
    insights: [
      'Customer segments',
      'Feature impact analysis'
    ],
    complexity: 3
  },
  {
    name: 'Predictive Intelligence',
    description: 'Implement machine learning models and predictive analytics',
    dataCollection: [
      'Cross-platform integration',
      'Real-time monitoring',
      'Advanced user profiling'
    ],
    metrics: [
      'Prediction accuracy',
      'Model performance',
      'Business impact'
    ],
    insights: [
      'Trend forecasting',
      'Automated optimization'
    ],
    complexity: 5
  }
];

// Mock Final Concept
const MOCK_FINAL_CONCEPT = {
  refinedIdea: "An AI-powered B2B SaaS platform that automates financial compliance reporting while building a proprietary dataset of compliance patterns. Starting with minimal customer data requirements, the platform evolves to provide predictive insights and industry benchmarks.",
  keyFeatures: [
    {
      title: "Smart Compliance Automation",
      description: "Automated report generation and validation using AI to reduce manual work by 80%",
      impact: "Time & Cost Savings"
    },
    {
      title: "Progressive Data Insights",
      description: "Evolving intelligence that improves with each customer interaction",
      impact: "Competitive Advantage"
    },
    {
      title: "Risk Prevention",
      description: "Predictive analytics to identify potential compliance issues before they occur",
      impact: "Risk Mitigation"
    },
    {
      title: "Industry Benchmarking",
      description: "Anonymous aggregated insights across the customer base",
      impact: "Strategic Value"
    }
  ],
  whyItWorks: [
    {
      title: "Growing Regulatory Complexity",
      explanation: "Increasing compliance requirements create persistent demand"
    },
    {
      title: "Network Effects",
      explanation: "Each new customer improves the accuracy and value of insights for all users"
    },
    {
      title: "Low Initial Friction",
      explanation: "Starts with existing customer data, no complex integration required"
    },
    {
      title: "Expanding Moat",
      explanation: "Proprietary dataset becomes increasingly valuable and hard to replicate"
    }
  ],
  targetCustomer: "Mid-sized financial services companies (100-1000 employees) struggling with complex regulatory reporting requirements and seeking both efficiency and risk reduction.",
  uniqueValue: "Transforming compliance from a cost center into a strategic advantage by combining automation with proprietary industry insights that improve over time.",
  successMetrics: [
    {
      name: "Time Saved",
      target: "80% reduction in compliance reporting time"
    },
    {
      name: "Error Reduction",
      target: "95% decrease in reporting errors"
    },
    {
      name: "Customer ROI",
      target: "5x return on investment within first year"
    }
  ],
  earlyValidation: [
    {
      what: "Compliance Officer Interviews",
      how: "Conduct 20 interviews with compliance officers to validate pain points and value proposition"
    },
    {
      what: "MVP Testing",
      how: "Partner with 3 companies for paid pilot program focusing on most common reports"
    },
    {
      what: "Data Value Testing",
      how: "Generate sample cross-company insights report to validate additional value proposition"
    }
  ]
};

const BusinessIdeaAnalyzer = ({ onAnalysisStart, onStageComplete }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('concept');

  const analyzeBusiness = async (idea) => {
    setLoading(true);
    setError(null);
    onAnalysisStart();

    try {
      const result = await analyzeBusinessIdea(idea);
      setAnalysis({
        ...result,
        marketData: MOCK_MARKET_DATA,
        finalConcept: MOCK_FINAL_CONCEPT
      });
      setCurrentPhase(0);
      onStageComplete();
    } catch (error) {
      console.error('Analysis error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <IdeaInput onSubmit={analyzeBusiness} loading={loading} />

      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'concept', name: 'Final Concept' },
                { id: 'market', name: 'Market Analysis' },
                { id: 'industry', name: 'Industry Research' },
                { id: 'data', name: 'Data Strategy' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    ${activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  `}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'concept' && (
              <FinalConcept concept={analysis.finalConcept} />
            )}

            {activeTab === 'market' && (
              <MarketAnalysis marketData={analysis.marketData} />
            )}

            {activeTab === 'industry' && (
              <IndustryResearch industryData={MOCK_INDUSTRY_DATA} />
            )}

            {activeTab === 'data' && (
              <DataEvolutionStrategy 
                strategy={MOCK_DATA_STRATEGY}
                currentPhase={currentPhase}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessIdeaAnalyzer;