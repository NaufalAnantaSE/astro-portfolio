"use client"; 

import { useEffect, useState } from 'react';
import { useMotionTemplate, useMotionValue, motion, animate } from 'framer-motion';

const projects = [
  {
    id: 1,
    year: 2024,
    title: "Rebuild E-commerce Apps",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "A Flutter-based e-commerce application with user login system, interactive page navigation, and API integration.",
    image: "/naufal-ananta-ekomers.png",
  },
  {
    id: 2,
    year: 2023,
    title: "Meranti Jaya Building Store Website (PHP)",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "A PHP-based information system for managing products, stock, and sales transactions at Meranti Jaya building store. Features include product catalog, shopping cart, user management, and sales reporting.",
    image: "/naufal-ananta-merantijaya.png",
  },
  {
    id: 3,
    year: 2023,
    title: "Salem Village Waste Bank",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "A PHP native web-based system designed for managing household waste exchange transactions in Salem Village. The system allows waste bank administrators to record deposits, track user balances, and generate reports. It aims to simplify the waste collection process and provide transparent balance tracking for residents who exchange recyclable waste for monetary value or goods.",
    image: "naufal-ananta-banksampah.png",
  },
  {
    id: 4,
    year: 2025,
    title: "portfolio Build with next.js",
    alt: "Naufal Ananta - Fullstack Developer dari Purwokerto",
    description: "a portfolio similar to this build using nextjs",
    image: "naufal-ananta-portfolio.png",
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
                className={`text-3xl font-semibold transition-colors duration-300 ${
                  selectedProject.id === project.id
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
                    {project.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        <img
          src={selectedProject.image}
          alt={selectedProject.alt}
          className="rounded-xl shadow-lg transition-opacity duration-400 ease-in-out"
          width={800}
          height={450}
        />
      </div>
    </motion.section>
  );
};

export default Portfolio;
