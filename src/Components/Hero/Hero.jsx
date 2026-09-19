import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiBox, FiLayers } from 'react-icons/fi';
import { Link } from 'react-router';

const Hero = () => {
    const [totalModels, setTotalModels] = useState('5K+');

  
    useEffect(() => {
        fetch('http://localhost:3000/models')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTotalModels(`${data.length}+`);
                }
            })
            .catch(err => console.error("Error fetching model count:", err));
    }, []);

    const scrollToBottom = () => {
        window.scrollTo({
            top: window.innerHeight, 
            behavior: 'smooth' 
        });
    };

    return (
        <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-base-100 text-base-content px-4 sm:px-6 lg:px-8 text-center py-16 transition-colors duration-300">
            
        
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e11d48]/15 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
            
            {/* গ্রিড প্যাটার্ন */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] opacity-[0.03] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
                
               
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                    UNLOCK THE NEXT <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] via-pink-500 to-rose-400 drop-shadow-sm">
                        DIMENSION
                    </span>
                </h1>
                
              
                <p className="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto font-light leading-relaxed">
                    Browse, Download, and Animate Thousands of Premium 3D Assets, Sci-Fi Characters, and Environments for Your Ultimate Projects.
                </p>
                
               
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                    <button 
                        onClick={scrollToBottom}
                        className="bg-[#e11d48] hover:bg-[#be123c] text-white px-8 py-3 text-base font-medium shadow-xl shadow-[#e11d48]/30 hover:shadow-[#e11d48]/50 transition-all duration-300 flex items-center gap-2 rounded-xl cursor-pointer"
                    >
                        View Latest Models <FiArrowRight size={18} />
                    </button>
                    
                    <Link 
                        to="/addModel" 
                        className="border-2 border-[#e11d48] text-[#e11d48] hover:bg-[#e11d48] hover:text-white px-8 py-3 text-base font-medium transition-all duration-300 rounded-xl"
                    >
                        Become a Creator
                    </Link>
                </div>

                {/* স্ট্যাটস সেকশন */}
                <div className="grid grid-cols-3 gap-8 pt-12 border-t border-base-300 w-full max-w-xl mx-auto text-center">
                    <div>
                        <h4 className="text-3xl font-extrabold text-[#e11d48] flex items-center justify-center gap-1">
                            <FiBox size={24} /> {totalModels}
                        </h4>
                        <p className="text-xs sm:text-sm opacity-70 mt-1">3D Models</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-extrabold text-[#e11d48] flex items-center justify-center gap-1">
                            <FiLayers size={24} /> 100%
                        </h4>
                        <p className="text-xs sm:text-sm opacity-70 mt-1">Rigged & Ready</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-extrabold text-[#e11d48]">24/7</h4>
                        <p className="text-xs sm:text-sm opacity-70 mt-1">Free Access</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Hero;