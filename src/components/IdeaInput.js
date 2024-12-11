import React, { useState } from 'react';

const IdeaInput = ({ onSubmit, loading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="idea" className="block text-sm font-medium text-gray-700">
          Describe your business idea
        </label>
        <textarea
          id="idea"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          placeholder="Enter your business idea here..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !idea.trim()}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Refining Idea (5 iterations)...
          </span>
        ) : (
          'Analyze & Refine Idea'
        )}
      </button>
    </form>
  );
};

export default IdeaInput;