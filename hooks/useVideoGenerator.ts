
import { useState, useCallback, useRef, useEffect } from 'react';
import { generateVideo } from '../services/geminiService';
import { PROMPT, LOADING_MESSAGES } from '../constants';

export const useVideoGenerator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const intervalRef = useRef<number | null>(null);

  const startProgressMessages = () => {
    setProgressMessage(LOADING_MESSAGES[0]);
    let messageIndex = 1;
    intervalRef.current = window.setInterval(() => {
      setProgressMessage(LOADING_MESSAGES[messageIndex % LOADING_MESSAGES.length]);
      messageIndex++;
    }, 5000); // Change message every 5 seconds
  };

  const stopProgressMessages = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgressMessage('');
  };

  const handleGenerateVideo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setVideoUrl(null);
    startProgressMessages();

    try {
      const url = await generateVideo(PROMPT);
      setVideoUrl(url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
      stopProgressMessages();
    }
  }, []);
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      stopProgressMessages();
    };
  }, []);

  return {
    isLoading,
    videoUrl,
    error,
    progressMessage,
    handleGenerateVideo,
  };
};
