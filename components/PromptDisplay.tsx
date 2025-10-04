
import React from 'react';
import { QuoteIcon } from './Icons';

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
        <QuoteIcon className="w-6 h-6 mr-2 text-orange-400" />
        Animation Storyboard
      </h2>
      <p className="text-slate-600 leading-relaxed font-serif">
        {prompt}
      </p>
    </div>
  );
};

export default PromptDisplay;
