
import React from 'react';
import { SKILLS } from '../constants';
import type { Skill } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">{children}</h2>
);

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all duration-300 transform hover:-translate-y-2">
    {skill.icon}
    <p className="mt-4 text-lg font-semibold text-white">{skill.name}</p>
  </div>
);

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20">
      <SectionTitle>My Tech Stack</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
