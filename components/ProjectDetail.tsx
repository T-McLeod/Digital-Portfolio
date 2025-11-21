import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Project } from '../types';
import { API_BASE_URL } from '../config';


const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${slug}/`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error('Failed to load project');
        }
        const data = await response.json();
        setProject(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const nextImage = () => {
    if (project?.galleryImages) {
      setCurrentImageIndex((prev) => (prev + 1) % project.galleryImages!.length);
    }
  };

  const prevImage = () => {
    if (project?.galleryImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.galleryImages!.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-400"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
        <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {error === 'Project not found' ? '404 - Project Not Found' : 'Error'}
          </h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const featuredSkills = project.skills?.filter(skill => skill.isFeatured) || [];
  const nonFeaturedSkills = project.skills?.filter(skill => !skill.isFeatured) || [];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Back Button */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 py-8">
        <div className="container mx-auto px-6 md:px-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-slate-400 hover:text-sky-400 transition-colors mb-6 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-xl text-slate-300 mb-6">{project.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-700 text-sky-300 text-sm font-semibold rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {/* External Links */}
            {project.links?.map(project_link => (
              <a
                  key={project_link.id}
                  href={project_link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <span dangerouslySetInnerHTML={{ __html: project_link.svgIcon || '' }} />
                  {project_link.displayName}
                </a>
              ))
            }
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        {/* Image Gallery */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Gallery</h2>
            <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-xl">
              <img
                src={project.galleryImages[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-[400px] md:h-[500px] object-contain"
              />
              
              {project.galleryImages.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-3 rounded-full transition-all"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Next Button */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-900 text-white p-3 rounded-full transition-all"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-sky-400 w-8' 
                            : 'bg-slate-500 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Long Description */}
        {project.longDescription && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">About This Project</h2>
            <div className="bg-slate-800 rounded-lg p-6 md:p-8 shadow-xl">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mt-6 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mt-5 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-white mt-4 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="text-slate-300 mb-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 text-slate-300 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 text-slate-300 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                    a: ({node, ...props}) => <a className="text-sky-400 hover:text-sky-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    code: ({node, inline, ...props}: any) => 
                      inline ? (
                        <code className="bg-slate-700 text-sky-300 px-1.5 py-0.5 rounded text-sm" {...props} />
                      ) : (
                        <code className="block bg-slate-700 text-sky-300 p-4 rounded-lg mb-4 overflow-x-auto" {...props} />
                      ),
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-sky-500 pl-4 italic text-slate-400 mb-4" {...props} />,
                  }}
                >
                  {project.longDescription}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {project.skills && project.skills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Technologies Used</h2>
            
            {/* Featured Skills */}
            {featuredSkills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Key Technologies
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {featuredSkills.map(skill => (
                    <div
                      key={skill.id}
                      className="bg-gradient-to-br from-sky-500/20 to-sky-600/10 border-2 border-sky-500/50 rounded-lg p-4 shadow-lg hover:shadow-sky-500/30 transition-all transform hover:-translate-y-1"
                    >
                      <div
                        className="w-12 h-12 text-sky-400 mb-3"
                        dangerouslySetInnerHTML={{ __html: skill.svgIcon }}
                      />
                      <h4 className="font-semibold text-white">{skill.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Skills */}
            {nonFeaturedSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-400 mb-4">Additional Technologies</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {nonFeaturedSkills.map(skill => (
                    <div
                      key={skill.id}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg hover:shadow-slate-700/50 hover:border-slate-600 transition-all transform hover:-translate-y-1"
                    >
                      <div
                        className="w-12 h-12 text-slate-400 mb-3"
                        dangerouslySetInnerHTML={{ __html: skill.svgIcon }}
                      />
                      <h4 className="font-semibold text-slate-300">{skill.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Back Button (Bottom) */}
        <div className="text-center pt-8">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
