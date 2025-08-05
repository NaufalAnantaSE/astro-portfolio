
"use client";
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const navLink = [
    { title: 'About', path: '#about' },
    { title: 'Portfolio', path: '#portfolio' },
    { title: 'Stack', path: '#stack' },
    { title: 'Contact', path: '#contact' },

]

export const NavbarReact = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => {
        setNav(!nav);
    }


    return (
        <div className='z-50 fixed flex justify-center w-full text-amber-50 font-bold'>
            <div className='border border-white/20 mt-8 backdrop-blur-3xl rounded-3xl hidden md:flex items-center justify-between p-2 max-w-[400px] mx-auto'>
                <ul className="flex flex-row p-2 space-x-8">
                    {navLink.map((link, index) => (
                        <li key={index}>
                            <a href={link.path} className="transform hover:text-white/50 transition-all duration-300 ease-in-out">
                                {link.title}

                            </a>

                        </li>
                    ))}

                </ul>
            </div>

            <div onClick={toggleNav} className='md:hidden absolute top-5 right-14 border rounded z-50 text-white/50 border-white/70 p-2'>
                {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
            </div>
            <div className={`fixed left-0 top-0 w-full h-full bg-black/90 transform transition-transform duration-300 ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
                <ul className='flex flex-col items-center justify-center space-y-8 h-full'>
                    {navLink.map((link, index) => (
                        <li key={index} className='text-amber-50 font-bold text-2xl'>
                            <a href={link.path} onClick={toggleNav} className="transform hover:text-white/50 transition-all duration-300 ease-in-out">
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )

}

export default NavbarReact
