"use client"

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchPersonalInfo, type PersonalInfo } from '../lib/api';

export const ContactReact = () => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPersonalInfo = async () => {
            try {
                setLoading(true);
                setError(null);
                const infoData = await fetchPersonalInfo();
                setPersonalInfo(infoData);
            } catch (error) {
                console.error('Error loading personal info:', error);
                setError('Failed to load contact information. Please check API connection.');
            } finally {
                setLoading(false);
            }
        };

        loadPersonalInfo();
    }, []);

    if (loading) {
        return (
            <section id="contact" className="overflow-x-clip py-32 text-white max-w-[1200px] mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-12 animate-pulse">
                        <div className="h-16 bg-gray-600/30 rounded w-3/4"></div>
                        <div className="glass p-8 rounded-2xl space-y-8 bg-white/5 backdrop-blur-md border border-white/10">
                            <div className="h-12 bg-gray-600/20 rounded"></div>
                            <div className="h-12 bg-gray-600/20 rounded"></div>
                            <div className="h-12 bg-gray-600/20 rounded"></div>
                        </div>
                    </div>
                    <div className="w-full h-[400px] bg-gray-600/30 rounded-2xl animate-pulse"></div>
                </div>
            </section>
        );
    }

    if (error || !personalInfo) {
        return (
            <section id="contact" className="overflow-x-clip py-32 text-white max-w-[1200px] mx-auto px-4">
                <div className="text-center">
                    <div className="text-red-400 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-red-400">Contact Information Unavailable</h2>
                    <p className="text-gray-400 mb-6">
                        {error || 'Unable to load contact information. Please check API connection.'}
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
        <section id="contact" className="overflow-x-clip py-32 text-white max-w-[1200px] mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-16"
            >
                <div className="space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold text-gray-300"
                    >
                        Get in <span className="text-purple-500">touch</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="glass p-8 rounded-2xl space-y-8 bg-white/5 backdrop-blur-md border border-white/10"
                    >
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">My Phone Number</p>
                            <a
                                href={`https://api.whatsapp.com/send?phone=${personalInfo.phone?.replace(/\D/g, '')}&text=Hi%2C%20There%F0%9F%91%8B`}
                                className="text-xl font-medium hover:text-purple-200 transition"
                            >
                                {personalInfo.phone || '+62 858 7694 7166'}
                            </a>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Email Me</p>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="text-xl font-medium hover:text-gray-200 transition"
                            >
                                {personalInfo.email}
                            </a>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">My GitHub</p>
                            <a
                                href={personalInfo.socialMedia.github || 'https://github.com/NaufalAnantaSE'}
                                className="text-xl font-medium hover:text-gray-200 transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {personalInfo.socialMedia.github?.replace('https://github.com/', '') || 'NaufalAnantaSE'}
                            </a>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-white/10"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.3952516571707!2d109.2334484!3d-7.4385988999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655dd56f8cd141%3A0x3ce1ba4461993ce3!2sJl.%20Kamper%20Raya%20No.223A%2C%20Bojong%2C%20Tanjung%2C%20Kec.%20Purwokerto%20Sel.%2C%20Kabupaten%20Banyumas%2C%20Jawa%20Tengah%2053144!5e0!3m2!1sid!2sid!4v1714387262321!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        title="Naufal Ananta - Fullstack Developer Purwokerto"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default ContactReact;
