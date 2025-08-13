"use client";

import { useEffect, useState } from 'react';
import { useMotionTemplate, useMotionValue, motion, animate } from 'framer-motion';

// --- PERUBAHAN 1: Tambahkan properti githubUrl & websiteUrl di data projects ---
const projects = [
  {
    id: 1,
    year: 2024,
    title: "Rebuild E-commerce Apps",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "A Flutter-based e-commerce application with user login system, interactive page navigation, and API integration.",
    image: "/naufal-ananta-ekomers.png",
    githubUrl: "https://github.com/NaufalAnantaSE/tubes-rebuilt-ecommerse-app", // Contoh URL
  },
  {
    id: 2,
    year: 2023,
    title: "Meranti Jaya Building Store Website (PHP)",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "A PHP-based information system for managing products, stock, and sales transactions at Meranti Jaya building store. Features include product catalog, shopping cart, user management, and sales reporting.",
    image: "/naufal-ananta-merantijaya.png",
    githubUrl: "https://github.com/NaufalAnantaSE/Merantijaya", // Contoh URL
  },
  {
    id: 3,
    year: 2023,
    title: "Salem Village Waste Bank",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "A PHP native web-based system designed for managing household waste exchange transactions in Salem Village. The system allows waste bank administrators to record deposits, track user balances, and generate reports. It aims to simplify the waste collection process and provide transparent balance tracking for residents who exchange recyclable waste for monetary value or goods.",
    image: "naufal-ananta-banksampah.png",
    githubUrl: "https://github.com/NaufalAnantaSE/bank-sampah",
    websiteUrl: "https://bssalem.com" // Contoh URL
  },
  {
    id: 4,
    year: 2025,
    title: "portfolio Build with next.js",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "a portfolio similar to this build using nextjs",
    image: "naufal-ananta-portfolio.png",
    githubUrl: "https://github.com/NaufalAnantaSE/portofolio", // Contoh URL
    websiteUrl: "https://naufal.dnn.web.id" // Contoh URL
  },
  
  {
    id: 5,
    year: 2025,
    title: "API Auth Build with nest.js",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "Auth Api build with nest.js and mongoDB as database and using jwt token or passport for authentication",
    image: "naufal-ananta-api-auth-docs.png",
    githubUrl: "https://github.com/NaufalAnantaSE/portofolio", // Contoh URL
    websiteUrl: "https://nest-auth-api.dnn.web.id/api-docs" // Contoh URL
  },

];


const COLOR_TOP = ["#6a00f4", "#9d00ff", "#b5179e", "#7209b7", "#560bad", "#3a0ca3"];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
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

  return (
    <motion.section
      style={{ background }}
      id="portfolio"
      className="py-32 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-6xl font-bold mb-10">
            Selected <span className="text-purple-400">Project</span>
          </h2>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer mb-8 group"
            >
              <h3
                className={`text-3xl font-semibold transition-colors duration-300 ${selectedProject.id === project.id
                    ? 'text-purple-200'
                    : 'group-hover:text-purple-400'
                  }`}
              >
                {project.title}
              </h3>
              {selectedProject.id === project.id && (
                <>
                  <div className="border-b-2 border-purple-200 my-4"></div>
                  <p className="text-gray-400 transition-all duration-400 ease-in-out">
                    {selectedProject.description}
                  </p>

                  {/* --- PERUBAHAN 2: Tambahkan container untuk tombol link --- */}
                  <div className="flex items-center gap-4 mt-6">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300 shadow-md"
                      >
                        GitHub
                      </a>
                    )}
                    {selectedProject.websiteUrl && (
                      <a
                        href={selectedProject.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-300 shadow-md"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pastikan key unik untuk memaksa re-render transisi opacity */}
        <motion.img
          key={selectedProject.id}
          src={selectedProject.image}
          alt={selectedProject.alt}
          className="rounded-xl shadow-lg"
          width={800}
          height={450}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </motion.section>
  );
};

export default Portfolio;