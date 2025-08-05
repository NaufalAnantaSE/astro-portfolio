import React from 'react';
import { FaReact } from 'react-icons/fa';
import { IoLogoNodejs } from 'react-icons/io';
import { SiTypescript, SiMongodb, SiNestjs, SiAstro} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';


const stackItems = [
    { id: 1, name: 'React', icon: FaReact, color: '#61DAFB' },
    { id: 2, name: 'Node.js', icon: IoLogoNodejs, color: '#339933' },
    { id: 3, name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { id: 4, name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { id: 5, name: 'Next JS', icon: TbBrandNextjs, color: '#000000' },
    { id: 6, name: 'Nest JS', icon: SiNestjs, color: '#E0234E' }, 
    { id: 7, name: 'Astro JS', icon: SiAstro, color: '#BC52EE' }, 
];


export const StacksReact = () => {
    return (
        <section id="stack" className='py-16 glass'>
            <div className='max-w-[1200px] mx-auto px-4 text-center'>
                <h2 className='text-5xl text-gray-200 font-bold mb-5'>My Stacks</h2>
                <div className='grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-2'>
                    {stackItems.map((item) => (
                        <div
                            key={item.id}
                            className='flex items-center justify-center flex-col rounded-xl p-4'
                        >
                            <div className='mb-4 bg-white/10 p-6 rounded-xl'>
                                {React.createElement(item.icon, {
                                    className: "w-23 h-23",
                                    style: { color: item.color }, 
                                })}
                            </div>
                            <p className='mt-4 text-white font-medium'>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StacksReact;