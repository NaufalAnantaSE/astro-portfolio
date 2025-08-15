"use client";

import { useEffect, useState } from 'react';
import { useMotionTemplate, useMotionValue, motion, animate } from 'framer-motion';
import { getPublishedProjects, type Project, getAssetUrl } from '../lib/api';


const COLOR_TOP = ["#6a00f4", "#9d00ff", "#b5179e", "#7209b7", "#560bad", "#3a0ca3"];

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const color = useMotionValue(COLOR_TOP[0]);

  const background = useMotionTemplate`
    radial-gradient(100% 60% at 50% 100%, ${color} 0%, #000 100%)`;

  useEffect(() => {
    animate(color, COLOR_TOP, {
      ease: 'easeInOut',
      duration: 8,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        // Request all items and disable status filtering (status=all)
        let result = await getPublishedProjects({ getAll: true, status: 'all' });
        let items = result.data || [];

        // Fallback: if API indicates more items than returned, refetch with larger limit
        if ((result as any)?.total && (result as any).total > items.length) {
          const total = (result as any).total as number;
          const res2 = await getPublishedProjects({ page: 1, limit: Math.max(total, 100), status: 'all' });
          items = res2.data || items;
        }

        setProjects(items);
        if (items.length > 0) {
          setSelectedProject(items[0]);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setError('Failed to load projects. Please check API connection.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <motion.section
        style={{ background }}
        id="portfolio"
        className="py-32 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <h2 className="text-6xl font-bold mb-10">
              Selected <span className="text-purple-400">Project</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="h-8 bg-gray-600/30 rounded w-3/4"></div>
                <div className="h-8 bg-gray-600/30 rounded w-2/3"></div>
                <div className="h-8 bg-gray-600/30 rounded w-1/2"></div>
              </div>
              <div className="h-64 bg-gray-600/30 rounded-xl"></div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <motion.section
        style={{ background }}
        id="portfolio"
        className="py-32 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-6xl font-bold mb-10">
            Selected <span className="text-purple-400">Project</span>
          </h2>
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-red-400">No Projects Found</h3>
          <p className="text-gray-400 mb-6">
            {error || 'Unable to load projects. Please check if the API server is running and projects are published.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Retry Loading
          </button>
        </div>
      </motion.section>
    );
  }

  if (!selectedProject) {
    return null;
  }

  return (
    <motion.section
      style={{ background }}
      id="portfolio"
      className="py-32 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        {/* Left: List */}
        <div className="relative">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Selected <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Project</span>
          </h2>

          <div role="listbox" aria-label="Projects" className="space-y-3">
            {projects.map((project) => {
              const active = selectedProject.id === project.id;
              return (
                <motion.button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  aria-selected={active}
                  className={`w-full text-left rounded-xl px-4 py-4 transition-colors backdrop-blur border ${
                    active
                      ? 'border-purple-400/40 bg-white/10'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className={`text-xl md:text-2xl font-semibold ${active ? 'text-purple-200' : 'text-white'}`}>
                        {project.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs md:text-sm text-gray-400">
                        <span className="inline-flex items-center rounded-full border border-white/10 px-2 py-0.5">
                          {project.year}
                        </span>
                        {project.status && (
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 border ${
                            project.status === 'published'
                              ? 'border-emerald-400/30 text-emerald-300'
                              : 'border-yellow-400/30 text-yellow-300'
                          }`}>
                            {project.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`ml-auto text-lg md:text-xl ${active ? 'text-purple-300' : 'text-gray-400'}`} aria-hidden>
                      ›
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <motion.img
              key={selectedProject.id}
              src={getAssetUrl(selectedProject.image)}
              alt={selectedProject.alt}
              className="w-full h-auto object-cover"
              width={800}
              height={450}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-2xl md:text-3xl font-bold">{selectedProject.title}</h3>
              <span className="inline-flex items-center rounded-full border border-white/10 px-2 py-0.5 text-sm text-gray-300">
                {selectedProject.year}
              </span>
              {selectedProject.status && (
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-sm border ${
                  selectedProject.status === 'published'
                    ? 'border-emerald-400/30 text-emerald-300'
                    : 'border-yellow-400/30 text-yellow-300'
                }`}>
                  {selectedProject.status === 'published' ? 'Published' : 'Draft'}
                </span>
              )}
            </div>

            <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-purple-600/90 hover:bg-purple-600 text-white font-semibold py-2 px-5 transition-colors shadow-md"
                >
                  GitHub
                </a>
              )}
              {selectedProject.websiteUrl && (
                <a
                  href={selectedProject.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 transition-colors shadow-md"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;