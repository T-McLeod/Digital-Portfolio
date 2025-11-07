
import React from 'react';
import { PERSONAL_INFO } from '../data/personalInfo';
import { PROFILE_PIC, PROFILE_PIC_FALLBACK } from '../data/assets';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{children}</h2>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <SectionTitle>About Me</SectionTitle>
      <div className="grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-2">
      <img
        src={PROFILE_PIC}
        alt="Tanner McLeod"
        className="rounded-lg shadow-lg w-full h-auto object-cover"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          if (el.src !== PROFILE_PIC_FALLBACK) {
            el.src = PROFILE_PIC_FALLBACK;
          }
        }}
      />
        </div>
        <div className="md:col-span-3">
            <p className="text-lg text-slate-400 leading-relaxed">
                {PERSONAL_INFO.long_bio}
            </p>
        </div>
      </div>
    </section>
  );
};

export default About;
