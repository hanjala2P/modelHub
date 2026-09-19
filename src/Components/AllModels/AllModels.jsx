import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ModelCard from '../Cards/ModelCard';

const AllModels = () => {
    const data = useLoaderData();
    const [models, setModels] = useState(data || []); 
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const search_text = e.target.search.value;
        console.log("Searching for:", search_text);

        setLoading(true);

        fetch(`http://localhost:3000/search?search=${search_text}`)
            .then(res => res.json())
            .then(data => {
                setModels(data || []); 
                setLoading(false); 
            })
            .catch(err => {
                console.error("Search error:", err);
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen text-white pb-16">
            <div className='flex flex-col md:flex-row justify-between items-center mx-8 gap-4 pt-4'>
                <h2 className='text-center md:text-left font-bold text-3xl'>All Models</h2>
                <form className='flex w-full md:w-auto' onSubmit={handleSearch}>
                    <label className="input flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-l-lg px-3 w-full md:w-80">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name='search' className='bg-transparent outline-none text-white placeholder-slate-400 w-full' type="search" required placeholder="Search models..." />
                    </label>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className='btn btn-secondary rounded-l-none border-none px-6 cursor-pointer'
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>
            </div>
            
            <div className='divider border-slate-800 mx-8 my-6'></div>

          
            {loading ? (
                <div className='min-h-[400px] flex flex-col items-center justify-center'>
                    <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 mt-4 font-medium tracking-wide">Searching models...</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 gap-8'>
                    
                    {Array.isArray(models) && models.length > 0 ? (
                        models.map(model => <ModelCard key={model?._id} model={model}></ModelCard>)
                    ) : (
                        <div className='col-span-full text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800'>
        <p className='text-slate-400 text-xl font-medium'>No models found!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllModels;