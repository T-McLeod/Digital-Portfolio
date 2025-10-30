
import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import AICoverLetterModal from './AICoverLetterModal';
import { API_BASE_URL } from '../config';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
);

const ProjectCard: React.FC<{ project: Project; onOpenAiModal: () => void }> = ({ project, onOpenAiModal }) => {
    const handleCardClick = () => {
        if (project.isAiFeature) {
            onOpenAiModal();
        } else if (project.liveUrl) {
            window.open(project.liveUrl, '_blank');
        }
    };

    return (
        <div 
            className="group rounded-lg overflow-hidden bg-slate-800 shadow-lg hover:shadow-sky-500/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-700 text-sky-300 text-xs font-semibold rounded-full">{tag}</span>
                    ))}
                </div>
                <div className="mt-auto flex items-center justify-between text-sm font-semibold">
                    {project.isAiFeature ? (
                        <button className="text-sky-400 hover:text-sky-300">Try It Out &rarr;</button>
                    ) : (
                        <div className="flex gap-4">
                           {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300" onClick={(e) => e.stopPropagation()}>Live Demo &rarr;</a>}
                           {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-300" onClick={(e) => e.stopPropagation()}>GitHub</a>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<React.ReactNode | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/api/projects/`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProjects(data);
          } catch (e) {
            setError(
                <div className="text-center text-red-300 bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h3 className="font-bold text-lg mb-2 text-white">Connection Error</h3>
                    <p className="mb-4">Failed to load projects. Please ensure the backend server is running.</p>
                    <div className="text-left text-sm bg-slate-900 p-4 rounded-md">
                        <p className="font-semibold mb-2">To start the backend server:</p>
                        <code className="block whitespace-pre-wrap font-mono">
                            1. Open a new terminal
                            <br />
                            2. cd backend
                            <br />
                            3. pip install -r requirements.txt
                            <br />
                            4. python manage.py migrate
                            <br />
                            5. python manage.py seed_data
                            <br />
                            6. python manage.py runserver
                        </code>
                    </div>
                </div>
            );
            console.error(e);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProjects();
      }, []);

    return (
        <>
            <section id="projects" className="py-20">
                <SectionTitle>Featured Projects</SectionTitle>
                {loading && (
                    <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto"></div>
                    </div>
                )}
                {error && <div className="max-w-2xl mx-auto">{error}</div>}
                {!loading && !error && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} onOpenAiModal={() => setIsModalOpen(true)} />
                        ))}
                    </div>
                )}
            </section>
            {isModalOpen && <AICoverLetterModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default Projects;
