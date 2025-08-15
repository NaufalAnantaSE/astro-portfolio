import React, { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { IoLogoNodejs } from 'react-icons/io';
import { SiTypescript, SiMongodb, SiNestjs, SiAstro} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { fetchTechStacks, type TechStack } from '../lib/api';


const iconMap: Record<string, React.ComponentType<any>> = {
  'React': FaReact,
  'Node.js': IoLogoNodejs,
  'TypeScript': SiTypescript,
  'MongoDB': SiMongodb,
  'Next JS': TbBrandNextjs,
  'Nest JS': SiNestjs,
  'Astro JS': SiAstro,
};


export const StacksReact = () => {
    const [techStacks, setTechStacks] = useState<TechStack[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTechStacks = async () => {
            try {
                setLoading(true);
                setError(null);
                const stacksData = await fetchTechStacks();
                setTechStacks(stacksData);
            } catch (error) {
                console.error('Error loading tech stacks:', error);
                setError('Failed to load tech stacks. Please check API connection.');
            } finally {
                setLoading(false);
            }
        };

        loadTechStacks();
    }, []);

    if (loading) {
        return (
            <section id="stack" className='py-16 glass'>
                <div className='max-w-[1200px] mx-auto px-4 text-center'>
                    <h2 className='text-5xl text-gray-200 font-bold mb-5'>My Stacks</h2>
                    <div className='grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-2'>
                        {[...Array(7)].map((_, index) => (
                            <div key={index} className='animate-pulse flex items-center justify-center flex-col rounded-xl p-4'>
                                <div className='mb-4 bg-white/10 p-6 rounded-xl'>
                                    <div className="w-16 h-16 bg-gray-600/30 rounded"></div>
                                </div>
                                <div className="h-4 bg-gray-600/30 rounded w-20"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error || techStacks.length === 0) {
        return (
            <section id="stack" className='py-16 glass'>
                <div className='max-w-[1200px] mx-auto px-4 text-center'>
                    <h2 className='text-5xl text-gray-200 font-bold mb-5'>My Stacks</h2>
                    <div className="text-red-400 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-red-400">No Tech Stacks Found</h3>
                    <p className="text-gray-400 mb-6">
                        {error || 'Unable to load tech stacks. Please check if the API server is running.'}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                        Retry Loading
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="stack" className='py-16 glass'>
            <div className='max-w-[1200px] mx-auto px-4 text-center'>
                <h2 className='text-5xl text-gray-200 font-bold mb-5'>My Stacks</h2>
                <div className='grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-2'>
                    {techStacks.map((stack) => {
                        
                        const IconComponent = iconMap[stack.name];
                        
                        return (
                            <div
                                key={stack.id}
                                className='flex items-center justify-center flex-col rounded-xl p-4'
                            >
                                <div className='mb-4 bg-white/10 p-6 rounded-xl'>
                                    {IconComponent ? (
                                        <IconComponent
                                            className="w-23 h-23"
                                            style={{ color: stack.color }}
                                        />
                                    ) : (
                                        
                                        <img 
                                            src={stack.icon} 
                                            alt={stack.name}
                                            className="w-16 h-16"
                                            style={{ filter: `hue-rotate(${stack.color})` }}
                                        />
                                    )}
                                </div>
                                <p className='mt-4 text-white font-medium'>{stack.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StacksReact;