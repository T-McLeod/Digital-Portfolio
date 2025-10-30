
import React from 'react';
import { EXPERIENCE } from '../constants';
import type { ExperienceItem } from '../types';

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
  return (
    <section id="experience" className="py-20">
      <SectionTitle>Work Experience</SectionTitle>
      <ol className="relative border-l border-slate-700">
        {EXPERIENCE.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </ol>
    </section>
  );
};

export default Experience;
