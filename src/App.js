import React, { useState } from 'react';
import BusinessIdeaAnalyzer from './components/BusinessIdeaAnalyzer';
import ProgressBar from './components/ProgressBar';
import MarketAnalysis from './components/MarketAnalysis';
import AnalysisHistory from './components/AnalysisHistory';
import './App.css';

const ANALYSIS_STAGES = [
  'Initial Analysis',
  'Market Research',
  'Data Strategy',
  'Scale Planning',
  'Final Review'
];

const MOCK_SAVED_ANALYSES = [
  {
    id: 1,
    ideaTitle: 'AI-Powered Learning Platform',
    timestamp: '2024-12-11T10:00:00',
    marketSize: 5.2,
    growthRate: 15,
    confidence: 85
  },
  {
    id: 2,
    ideaTitle: 'Sustainable Food Delivery',
    timestamp: '2024-12-10T15:30:00',
    marketSize: 3.8,
    growthRate: 12,
    confidence: 78
  }
];

const MOCK_MARKET_DATA = {
  totalMarketSize: 12.5,
  targetMarketSize: 3.2,
  growthRate: 18,
  competitiveLandscape: [
    { name: 'Competitor A', marketShare: 35 },
    { name: 'Competitor B', marketShare: 25 },
    { name: 'Competitor C', marketShare: 15 },
    { name: 'Others', marketShare: 25 }
  ],
  revenueModel: {
    streams: [
      { name: 'Subscription', potential: 500 },
      { name: 'Premium Features', potential: 300 },
      { name: 'API Access', potential: 200 }
    ]
  },
  costStructure: {
    items: [
      { name: 'Development', amount: 400 },
      { name: 'Marketing', amount: 250 },
      { name: 'Operations', amount: 150 }
    ]
  }
};

function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [savedAnalyses, setSavedAnalyses] = useState(MOCK_SAVED_ANALYSES);
  const [marketData, setMarketData] = useState(MOCK_MARKET_DATA);

  const handleAnalysisStart = () => {
    setAnalysisInProgress(true);
    setCurrentStage(0);
    setShowHistory(false);
  };

  const handleStageComplete = () => {
    if (currentStage < ANALYSIS_STAGES.length - 1) {
      setCurrentStage(prev => prev + 1);
      // Simulate market data updates as analysis progresses
      setMarketData(prev => ({
        ...prev,
        growthRate: prev.growthRate + Math.random() * 2
      }));
    } else {
      setAnalysisInProgress(false);
    }
  };

  const handleCompareAnalyses = (selectedIds) => {
    // TODO: Implement comparison logic
    console.log('Comparing analyses:', selectedIds);
  };

  const handleLoadAnalysis = (analysis) => {
    setCurrentAnalysis(analysis);
    setShowHistory(false);
  };

  const handleSaveAnalysis = () => {
    const newAnalysis = {
      id: Date.now(),
      ideaTitle: 'New Business Idea', // Replace with actual idea title
      timestamp: new Date().toISOString(),
      marketSize: marketData.totalMarketSize,
      growthRate: marketData.growthRate,
      confidence: Math.round(Math.random() * 20 + 70) // Mock confidence score
    };
    setSavedAnalyses(prev => [newAnalysis, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-5xl sm:mx-auto w-full px-4">
        <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-full mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* Header with controls */}
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Analyzer
                  </h1>
                  <div className="space-x-4">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                    {currentAnalysis && (
                      <button
                        onClick={handleSaveAnalysis}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Save Analysis
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {analysisInProgress && (
                  <ProgressBar
                    currentStep={currentStage}
                    totalSteps={ANALYSIS_STAGES.length}
                    stages={ANALYSIS_STAGES}
                  />
                )}

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8">
                  {showHistory ? (
                    <AnalysisHistory
                      savedAnalyses={savedAnalyses}
                      onCompare={handleCompareAnalyses}
                      onLoad={handleLoadAnalysis}
                    />
                  ) : (
                    <>
                      <BusinessIdeaAnalyzer 
                        onAnalysisStart={handleAnalysisStart}
                        onStageComplete={handleStageComplete}
                      />
                      
                      {currentAnalysis && (
                        <MarketAnalysis marketData={marketData} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;