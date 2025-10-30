import React from 'react';
import { PERSONAL_INFO } from '../data/personalInfo';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center -mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
        <div className="order-2 md:order-1">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white">
            {PERSONAL_INFO.name}
          </h1>
          <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-sky-400">
            {PERSONAL_INFO.title}
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl">
            {PERSONAL_INFO.bio}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600 transition-colors text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-slate-800 text-white font-semibold rounded-md hover:bg-slate-700 transition-colors text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-slate-800 rounded-full blur-2xl opacity-50 animate-pulse-slow"></div>
                <img 
                    src="https://picsum.photos/seed/hero-portrait/500/500" 
                    alt="Portrait of Alex Doe"
                    className="relative rounded-full w-full h-full object-cover shadow-2xl ring-4 ring-slate-800/50"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
