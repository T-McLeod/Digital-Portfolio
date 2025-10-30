
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO } from '../data/personalInfo';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateCoverLetter = async (jobDescription: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing. Please set the API_KEY environment variable.");
  }
  
  const myDetails = `
    My name is ${PERSONAL_INFO.name}. I am a ${PERSONAL_INFO.title}. 
    My core skills include React, TypeScript, Next.js, Node.js, and Tailwind CSS. 
    Here's a summary of my background: ${PERSONAL_INFO.long_bio}
  `;

  const prompt = `
    Based on my professional details below, write a professional and compelling cover letter for the following job description.
    The tone should be confident but not arrogant. Highlight how my skills and experience align with the job requirements.
    The cover letter should be concise, around 3-4 paragraphs.

    ---
    MY PROFESSIONAL DETAILS:
    ${myDetails}
    ---
    JOB DESCRIPTION:
    ${jobDescription}
    ---

    Now, generate the cover letter.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter. The API call may have failed.");
  }
};
