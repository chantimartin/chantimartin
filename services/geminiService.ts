
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateVideo = async (prompt: string): Promise<string> => {
  try {
    console.log("Starting video generation...");
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      config: {
        numberOfVideos: 1
      }
    });

    console.log("Polling for video result...");
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds before polling again
      operation = await ai.operations.getVideosOperation({ operation: operation });
      console.log("Polling... operation status:", operation.done);
    }

    if (operation.error) {
        throw new Error(`Video generation failed with error: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("Video generation completed, but no download link was found.");
    }

    console.log("Fetching generated video from:", downloadLink);
    const response = await fetch(`${downloadLink}&key=${API_KEY}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch video file: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    console.log("Video URL created:", objectURL);
    
    return objectURL;
  } catch (error) {
    console.error("Error in generateVideo service:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate video: ${error.message}`);
    }
    throw new Error("An unknown error occurred during video generation.");
  }
};
