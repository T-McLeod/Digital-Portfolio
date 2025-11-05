
import React, { useState, useEffect } from 'react';
import type { Skill } from '../types';
import { API_BASE_URL } from '../config';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">{children}</h2>
);

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all duration-300 transform hover:-translate-y-2">
    <div className="h-8 w-8 text-sky-400" dangerouslySetInnerHTML={{ __html: skill.svgIcon }} />
    <p className="mt-4 text-lg font-semibold text-white">{skill.name}</p>
  </div>
);

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/skills/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSkills(data);
      } catch (e) {
        setError(
            <div className="text-center text-red-400 bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-2 text-white">Error</h3>
                <p>Failed to load skills. Could not connect to the server.</p>
            </div>
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-20">
      <SectionTitle>My Tech Stack</SectionTitle>
      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto"></div>
        </div>
      )}
      {error && <div className="max-w-2xl mx-auto">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;