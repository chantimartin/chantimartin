
import React from 'react';
import Header from './components/Header';
import PromptDisplay from './components/PromptDisplay';
import VideoPlayer from './components/VideoPlayer';
import Button from './components/Button';
import { FilmIcon } from './components/Icons';
import { useVideoGenerator } from './hooks/useVideoGenerator';
import { PROMPT } from './constants';

const App: React.FC = () => {
  const { 
    isLoading, 
    videoUrl, 
    error, 
    progressMessage, 
    handleGenerateVideo 
  } = useVideoGenerator();

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PromptDisplay prompt={PROMPT} />
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleGenerateVideo} 
              disabled={isLoading}
            >
              <FilmIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Generating Animation...' : 'Generate Animation'}
            </Button>
          </div>
          
          <div className="mt-8">
            <VideoPlayer 
              isLoading={isLoading} 
              videoUrl={videoUrl} 
              error={error} 
              progressMessage={progressMessage} 
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
