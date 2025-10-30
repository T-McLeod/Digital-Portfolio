
import React, { useState, useEffect } from 'react';
import type { ExperienceItem } from '../types';
import { API_BASE_URL } from '../config';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
);

const TimelineItem: React.FC<{ item: ExperienceItem }> = ({ item }) => (
  <li className="mb-10 ml-6">
    <span className="absolute flex items-center justify-center w-6 h-6 bg-sky-500 rounded-full -left-3 ring-8 ring-slate-800">
      <svg className="w-2.5 h-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
        <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
      </svg>
    </span>
    <h3 className="flex items-center mb-1 text-xl font-semibold text-white">{item.role}
      <span className="bg-sky-900 text-sky-300 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">{item.company}</span>
    </h3>
    <time className="block mb-2 text-sm font-normal leading-none text-slate-500">{item.period}</time>
    <ul className="list-disc list-inside mt-4 space-y-2 text-slate-400">
        {item.description.map((desc, index) => (
            <li key={index}>{desc}</li>
        ))}
    </ul>
  </li>
);

const Experience: React.FC = () => {
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/experience/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExperience(data);
      } catch (e) {
        setError(
            <div className="text-center text-red-400 bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-2 text-white">Error</h3>
                <p>Failed to load work experience. Could not connect to the server.</p>
            </div>
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-20">
      <SectionTitle>Work Experience</SectionTitle>
      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto"></div>
        </div>
      )}
      {error && <div className="max-w-2xl mx-auto">{error}</div>}
      {!loading && !error && (
        <ol className="relative border-l border-slate-700">
          {experience.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </ol>
      )}
    </section>
  );
};

export default Experience;