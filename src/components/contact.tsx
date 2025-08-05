"use client"

import { motion } from 'framer-motion';

export const ContactReact = () => {
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
                                href="https://api.whatsapp.com/send?phone=6285876947166&text=Hi%2C%20There%F0%9F%91%8B"
                                className="text-xl font-medium hover:text-purple-200 transition"
                            >
                                +62 858 7694 7166
                            </a>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Email Me</p>
                            <a
                                href="mailto:anantanaufal250@gmail.com"
                                className="text-xl font-medium hover:text-gray-200 transition"
                            >
                                anantanaufal250@gmail.com
                            </a>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">My GitHub</p>
                            <a
                                href="https://github.com/NaufalAnantaSE"
                                className="text-xl font-medium hover:text-gray-200 transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                NaufalAnantaSE
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
