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
        {loading ? 'Analyzing...' : 'Analyze Idea'}
      </button>
    </form>
  );
};

export default IdeaInput;