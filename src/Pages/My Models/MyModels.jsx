import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import ModelCard from '../../Components/Cards/ModelCard';
import { FiBox } from 'react-icons/fi'; // আইকনের জন্য ইমপোর্ট করা হলো

const MyModels = () => {
    const { user } = React.use(AuthContext);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.accessToken) {
            console.log("Waiting for user token...");
            // ইউজার টোকেন না থাকলে লোডিং অফ করে দেওয়া যেতে পারে যাতে অহেতুক স্পিনার ঘুরে না থাকে
            setLoading(false);
            return;
        }

        console.log("Fetching my models with token...");
        setLoading(true);
        
        fetch(`http://localhost:3000/my-models?email=${user.email}`, {
            headers: {
               Authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("My models data:", data);
            if (Array.isArray(data)) {
                setModels(data);
            } else {
                setModels([]);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching models:", err);
            setModels([]);
            setLoading(false);
        });
            
    }, [user, user?.accessToken]);

    // ডেটা লোডিংয়ের সময় সুন্দর স্পিনার দেখাবে
    if (loading) {
        return (
            <div className='min-h-[60vh] flex flex-col items-center justify-center bg-slate-950'>
                <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 mt-4 font-medium tracking-wide">Loading your models...</p>
            </div>
        );
    }

    return (
        <div className='py-10 min-h-[60vh]'>
            <h2 className='text-3xl font-bold text-center text-white mb-8'>My Models</h2>

            {/* সেফটি চেক: models যদি অ্যারে হয় তবেই ম্যাপ চালাবে */}
            {Array.isArray(models) && models.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 mt-7 gap-8'>
                    {models.map(model => (
                        <ModelCard key={model._id} model={model}></ModelCard>
                    ))}
                </div>
            ) : (
               
                <div className='flex flex-col items-center justify-center py-20 bg-slate-900/40 mx-8 rounded-2xl border border-slate-800 text-center'>
                    <FiBox className='text-5xl text-pink-500 mb-3 animate-bounce' />
                   <h3 className='text-xl font-semibold text-white'>No models found!</h3>
<p className='text-slate-400 text-sm mt-1'>You haven't uploaded any 3D models yet, or the data has not loaded.</p>
                </div>
            )}
        </div>
    );
};

export default MyModels;