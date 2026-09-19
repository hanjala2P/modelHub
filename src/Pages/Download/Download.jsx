import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import ModelCard from '../../Components/Cards/ModelCard';
import { FiDownloadCloud } from 'react-icons/fi';

const Download = () => {
    const { user } = use(AuthContext);
    const [models, setModels] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // user email thakle tarpor-i fetch korbe
        if (user?.email && user?.accessToken) {
            setLoading(true);
            fetch(`http://localhost:3000/my-downloads?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setModels(data);
                } else {
                    setModels([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setModels([]);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [user]); 

  
    if (loading) {
        return (
            <div className='min-h-[60vh] flex flex-col items-center justify-center bg-slate-950'>
                <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 mt-4 font-medium tracking-wide">Loading your downloads...</p>
            </div>
        );
    }

    return (
        <div className='py-10 min-h-[60vh] text-white'>
            <h2 className='text-3xl font-bold text-center mb-8'>My Downloaded Models</h2>

          
            {Array.isArray(models) && models.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 mt-7 gap-8 mb-12'>
                    {models.map(model => (
                        <ModelCard key={model._id} model={model}></ModelCard>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-20 bg-slate-900/40 mx-8 rounded-2xl border border-slate-800 text-center'>
                    <FiDownloadCloud className='text-5xl text-pink-500 mb-3 animate-bounce' />
                <h3 className='text-xl font-semibold text-white'>No downloaded models found!</h3>
<p className='text-slate-400 text-sm mt-1'>You haven't downloaded any 3D models yet.</p>
                </div>
            )}
        </div>
    );
};

export default Download;