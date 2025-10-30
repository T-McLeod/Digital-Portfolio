
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO } from '../data/personalInfo';

// Initialize AI client only if API key is available
const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY as string }) : null;

export const generateCoverLetter = async (jobDescription: string): Promise<string> => {
  // Check if API key is missing and provide a warning
  if (!process.env.API_KEY || !ai) {
    console.warn("⚠️ Gemini API key is missing. Using demo mode.");
    return getDemoCoverLetter(jobDescription);
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

// Demo cover letter when API key is not available
const getDemoCoverLetter = (jobDescription: string): string => {
  const truncatedJob = jobDescription.substring(0, 100);
  
  return `Dear Hiring Manager,

I am writing to express my strong interest in the position described in your job posting${truncatedJob ? ` regarding "${truncatedJob}..."` : ''}.

As a ${PERSONAL_INFO.title}, I bring a comprehensive skill set in modern web development technologies including React, TypeScript, Next.js, Node.js, and Tailwind CSS. ${PERSONAL_INFO.long_bio}

I am particularly excited about this opportunity because it aligns perfectly with my technical expertise and passion for creating innovative solutions. My experience has equipped me with the ability to deliver high-quality, scalable applications while collaborating effectively with cross-functional teams.

I would welcome the opportunity to discuss how my background, skills, and enthusiasm can contribute to your team's success. Thank you for considering my application.

Sincerely,
${PERSONAL_INFO.name}

---
⚠️ DEMO MODE: This is a template cover letter. To generate AI-powered custom cover letters, please set the API_KEY environment variable with your Gemini API key.`;
};
