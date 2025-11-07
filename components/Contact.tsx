
import React from 'react';
import { PERSONAL_INFO } from '../data/personalInfo';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">{children}</h2>
);

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 text-center">
      <SectionTitle>Get In Touch</SectionTitle>
      <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-8">
        I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind or just want to connect.
      </p>
      <a 
        href={`mailto:${PERSONAL_INFO.email}`} 
        className="inline-block px-8 py-4 bg-sky-500 text-white font-bold rounded-md hover:bg-sky-600 transition-colors text-lg"
      >
        Say Hello
      </a>
      <div className="flex justify-center gap-6 mt-12">
        <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2,2,6.48,2,12c0,4.42,2.87,8.17,6.84,9.5c0.5,0.09,0.68-0.22,0.68-0.48c0-0.24-0.01-0.87-0.01-1.7c-2.78,0.6-3.37-1.34-3.37-1.34c-0.45-1.15-1.11-1.46-1.11-1.46c-0.91-0.62,0.07-0.6,0.07-0.6c1,0.07,1.53,1.03,1.53,1.03c0.89,1.53,2.34,1.09,2.91,0.83c0.09-0.65,0.35-1.09,0.63-1.34c-2.22-0.25-4.55-1.11-4.55-4.95c0-1.09,0.39-1.99,1.03-2.69c-0.1-0.25-0.45-1.27,0.1-2.65c0,0,0.84-0.27,2.75,1.02c0.79-0.22,1.65-0.33,2.5-0.33c0.85,0,1.71,0.11,2.5,0.33c1.91-1.29,2.75-1.02,2.75-1.02c0.55,1.38,0.2,2.4,0.1,2.65c0.64,0.7,1.03,1.6,1.03,2.69c0,3.85-2.34,4.7-4.57,4.94c0.36,0.31,0.68,0.92,0.68,1.85c0,1.34-0.01,2.42-0.01,2.74c0,0.27,0.18,0.57,0.69,0.48C19.13,20.17,22,16.42,22,12C22,6.48,17.52,2,12,2z"></path></svg>
        </a>
        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M8,18H5V9h3V18z M6.5,7.5C5.672,7.5,5,6.828,5,6s0.672-1.5,1.5-1.5S8,5.172,8,6S7.328,7.5,6.5,7.5z M19,18h-3v-4.5c0-1.219-0.469-2-1.5-2S13,12.281,13,13.5V18h-3V9h3v1.5C13.621,9.621,14.629,9,16.031,9C18.258,9,19,10.742,19,13V18z"></path></svg>
        </a>
      </div>
    </section>
  );
};

export default Contact;
