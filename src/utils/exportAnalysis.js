const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const generateMarkdown = (analysis) => {
  return `# Business Idea Analysis Report
Generated on: ${formatDate(new Date())}

## Executive Summary
${analysis.finalIdea}

## Market Analysis
- Total Market Size: $${analysis.marketData.totalMarketSize}B
- Target Market Size: $${analysis.marketData.targetMarketSize}B
- Growth Rate: ${analysis.marketData.growthRate}%

### Revenue Streams
${analysis.marketData.revenueModel.streams.map(stream => (
  `- ${stream.name}: $${stream.potential}K/year`
)).join('\n')}

## Data Evolution Strategy

### Initial Phase
${analysis.dataEvolution.initial}

### Growth Phase
${analysis.dataEvolution.growth}

### Maturity Phase
${analysis.dataEvolution.maturity}

## Validation Steps
${analysis.validationSteps.map((step, index) => (
  `${index + 1}. ${step.step}\n   ${step.description}`
)).join('\n\n')}

## Market Entry Strategy
${analysis.marketEntry.quickStart}

### Scaling Triggers
${analysis.marketEntry.scalingTriggers.map(trigger => `- ${trigger}`).join('\n')}

### Resource Requirements
${analysis.marketEntry.resourceNeeds}

## Competitive Advantage
${analysis.competitiveAdvantage}

## Risk Assessment
${analysis.risks.map(risk => `- ${risk}`).join('\n')}
`;
};

const downloadMarkdown = (analysis) => {
  const markdown = generateMarkdown(analysis);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `business-analysis-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const generatePDF = async (analysis) => {
  // This would be implemented with a PDF generation library
  // For now, we'll use markdown as the primary export format
  console.log('PDF generation to be implemented');
};

export const exportAnalysis = (analysis, format = 'markdown') => {
  switch (format) {
    case 'markdown':
      downloadMarkdown(analysis);
      break;
    case 'pdf':
      generatePDF(analysis);
      break;
    default:
      downloadMarkdown(analysis);
  }
};