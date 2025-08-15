"use client";
import { useEffect, useState } from 'react';
import { useMotionValue, useMotionTemplate, animate, motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { fetchPersonalInfo, type PersonalInfo, getAssetUrl } from '../lib/api';

const COLOR_TOP = [
    "#6a00f4", "#9d00ff", "#b5179e", "#7209b7", "#560bad", "#3a0ca3"
];

export const HeroReact = () => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const color = useMotionValue(COLOR_TOP[0]);

    useEffect(() => {
        animate(color, COLOR_TOP, {
            ease: 'easeInOut',
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror',
        });
    }, [color]);

    useEffect(() => {
        const loadPersonalInfo = async () => {
            try {
                setLoading(true);
                setError(null);
                const infoData = await fetchPersonalInfo();
                setPersonalInfo(infoData);
            } catch (error) {
                console.error('Error loading personal info:', error);
                setError('Failed to load personal information. Please check API connection.');
            } finally {
                setLoading(false);
            }
        };

        loadPersonalInfo();
    }, []);

    const background = useMotionTemplate`
    radial-gradient(100% 60% at 50% 100%, ${color} 0%, #000 100%)`;
    const border = useMotionTemplate`1px solid ${color}`;
    const box = useMotionTemplate`0px 4px 25px ${color}`;

    if (loading) {
        return (
            <motion.section
                style={{ background }}
                className='relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200'
            >
                <div className='z-10 flex flex-col items-center'>
                    <div className="animate-pulse text-center">
                        <div className="h-8 bg-gray-600/50 rounded mb-4 w-48"></div>
                        <div className="h-16 bg-gray-600/30 rounded mb-6 w-80"></div>
                        <div className="w-48 h-48 bg-gray-600/30 rounded-3xl mx-auto mb-4"></div>
                        <div className="h-12 bg-gray-600/30 rounded-3xl mb-4 w-64 mx-auto"></div>
                        <div className="h-20 bg-gray-600/20 rounded mb-6 w-96 mx-auto"></div>
                        <div className="h-12 bg-gray-600/20 rounded-full w-40 mx-auto"></div>
                    </div>
                </div>
            </motion.section>
        );
    }

    if (error || !personalInfo) {
        return (
            <motion.section
                style={{ background }}
                className='relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200'
            >
                <div className='z-10 flex flex-col items-center text-center'>
                    <div className="text-red-400 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-red-400">API Connection Error</h1>
                    <p className="text-gray-400 mb-6 max-w-md">
                        {error || 'Failed to load personal information. Please check if the API server is running.'}
                    </p>
                    <motion.button
                        onClick={() => window.location.reload()}
                        style={{ border, boxShadow: box }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex w-fit items-center gap-2 rounded-full px-4 py-2 text-white'
                    >
                        Retry Connection
                        <FiArrowRight />
                    </motion.button>
                </div>
            </motion.section>
        );
    }

    return (
        <motion.section
            style={{ background }}
            className='relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200'
        >
            <div className='z-10 flex flex-col items-center'>
                <span className='mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm'>
                    Open For Intern
                </span>
                <h1 className='text-white/40 text-7xl font-black'>Hi <span className='text-purple-400/40'>There!</span> 👋 Im</h1>
                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent font-black leading-tight text-5xl md:text-7xl">
                    {personalInfo.name}</h1>

                <img
                    className='rounded-3xl border-4 border-gray/20 shadow-xl mt-6 mb-4'
                    src={getAssetUrl(personalInfo.avatar)}
                    alt={`${personalInfo.name} - ${personalInfo.title}`}
                    width={200}
                    height={200}
                />

                <div className='flex bg-white/10 shadow-xl p-3 rounded-3xl justify-center items-center space-x-2 mb-4'>
                    <p className='font-medium'>{personalInfo.title}</p>
                </div>

                <p className='my-6 max-w-xl text-center'>
                    {personalInfo.bio}
                </p>

                <motion.a
                    href="https://drive.google.com/file/d/1eg9psvlNUN61I-nigwrzQbxLvL2X_BQn/view?usp=sharing"
                    target="_blank"
                    download
                    style={{ border, boxShadow: box }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex w-fit items-center gap-2 rounded-full px-4 py-2 text-white'
                >
                    Download My CV
                    <FiArrowRight />
                </motion.a>
            </div>

            <div className='bg-circle-container'>
                <div className='bg-circle-background'></div>
                <motion.div className='bg-circle'
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                ></motion.div>
            </div>
        </motion.section>
    );
};

export default HeroReact;
