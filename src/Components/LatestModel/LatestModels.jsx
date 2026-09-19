import React from 'react';
import { useLoaderData } from 'react-router';
import ModelCard from '../Cards/ModelCard';
import Hero from '../Hero/Hero';
import { FiBox } from 'react-icons/fi'; 

const LatestModels = () => {
    const data = useLoaderData();
    console.log(data);

    return (
        <div>
            <Hero></Hero>
            <section>
                <div className='my-12 mx-8'>
                    <h2 className='font-bold text-2xl text-white'>Latest Models</h2>
                    <div className='divider border-slate-800 my-4'></div>

                  
                    {Array.isArray(data) && data.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-8'>
                            {data.map(model => (
                                <ModelCard key={model?._id} model={model}></ModelCard>
                            ))}
                        </div>
                    ) : (
                     
                        <div className='col-span-full flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800 text-center my-6'>
                            <FiBox className='text-5xl text-pink-500 mb-3 animate-bounce' />
                           <h3 className='text-xl font-semibold text-white'>No latest models found!</h3>
<p className='text-slate-400 text-sm mt-1'>There is no data available in this section currently.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LatestModels;