
import React, { useState, useCallback } from 'react';
// import { generateCoverLetter } from '../services/geminiService';
const generateCoverLetter = () => {}; // Placeholder for the actual import

interface AICoverLetterModalProps {
  onClose: () => void;
}

const AICoverLetterModal: React.FC<AICoverLetterModalProps> = ({ onClose }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedLetter('');
    try {
      const letter = await generateCoverLetter(jobDescription);
      setGeneratedLetter(letter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [jobDescription]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">AI Cover Letter Generator</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-slate-300 mb-2">
                Paste Job Description Here
              </label>
              <textarea
                id="jobDescription"
                rows={12}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                placeholder="e.g., Seeking a proactive Senior Frontend Engineer with expertise in React..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-slate-300 mb-2">Generated Cover Letter</label>
              <div className="relative flex-grow bg-slate-900 border border-slate-700 rounded-md p-3">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                  </div>
                )}
                {error && <p className="text-red-400">{error}</p>}
                <div className="whitespace-pre-wrap text-slate-300 text-sm overflow-y-auto h-full max-h-80">
                  {generatedLetter}
                </div>
                {generatedLetter && (
                    <button onClick={handleCopy} className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-xs px-2 py-1 rounded">
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700 text-right">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Letter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoverLetterModal;
