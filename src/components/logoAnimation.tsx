"use client";

import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io";
import { SiTypescript, SiMongodb, SiNestjs, SiAstro } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

const icons = [
    { icon: <FaReact size={30} color="#61DBFB" />, key: "react" },
    { icon: <SiNestjs size={30} color="#E0234E" />, key: "nestjs" },
    { icon: <IoLogoNodejs size={30} color="#539E43" />, key: "nodejs" },
    { icon: <SiTypescript size={30} color="#3178C6" />, key: "ts" },
    { icon: <SiMongodb size={30} color="#4DB33D" />, key: "mongodb" },
    { icon: <TbBrandNextjs size={30} color="white" />, key: "nextjs" },
    { icon: <SiAstro size={30} color="#BC52EE" />, key: "AstroJs" },
    { icon: <FaReact size={30} color="#61DBFB" />, key: "react" },
    { icon: <SiNestjs size={30} color="#E0234E" />, key: "nestjs" },
    { icon: <IoLogoNodejs size={30} color="#539E43" />, key: "nodejs" },
    { icon: <SiTypescript size={30} color="#3178C6" />, key: "ts" },
    { icon: <SiMongodb size={30} color="#4DB33D" />, key: "mongodb" },
    { icon: <TbBrandNextjs size={30} color="white" />, key: "nextjs" },
    { icon: <SiAstro size={30} color="#BC52EE" />, key: "AstroJs" },
];

const repeatedIcons = [...icons, ...icons, ...icons]; 
export const LogoAnimationReact = () => {
    return (
        <div className="py-8 bg-purple-200/10 glass opacity-80">
            <div className="container mx-auto">
                <div className="overflow-hidden [mask-image:linear-gradient(to_right,_transparent,_black_75%,_transparent)]">
                    <motion.div
                        className="flex gap-8 flex-none pr-14 items-center"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                    >
                        {repeatedIcons.map(({ icon, key }, index) => (
                            <div key={`${key}-${index}`} className="min-w-[40px] flex justify-center items-center">
                                {icon}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LogoAnimationReact;