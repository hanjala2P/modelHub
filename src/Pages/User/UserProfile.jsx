import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import { FiBox, FiClock, FiUserCheck, FiMail, FiShield, FiArrowRight } from 'react-icons/fi';

const UserProfile = () => {
    const { user, loading: authLoading } = use(AuthContext);
    const [modelCount, setModelCount] = useState(0);
    const [fetchingModels, setFetchingModels] = useState(true);

    // Fetching how many models the user has added
    useEffect(() => {
        if (user?.email && user?.accessToken) {
            fetch(`http://localhost:3000/my-models?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setModelCount(data.length);
                }
                setFetchingModels(false);
            })
            .catch(err => {
                console.error("Error fetching model count:", err);
                setFetchingModels(false);
            });
        } else if (!authLoading) {
            setFetchingModels(false);
        }
    }, [user, authLoading]);

    // Show spinner if authentication is still loading
    if (authLoading || fetchingModels) {
        return (
            <div className='min-h-[70vh] flex flex-col items-center justify-center bg-slate-950 text-white'>
                <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 mt-4 font-medium tracking-wide">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className='min-h-[70vh] flex flex-col items-center justify-center text-white text-center px-4'>
                <h2 className='text-2xl font-bold mb-2'>No User Found</h2>
                <p className='text-slate-400 mb-4'>Please log in to view your profile.</p>
                <Link to="/login" className='btn bg-pink-600 hover:bg-pink-500 text-white border-none px-6'>Login Now</Link>
            </div>
        );
    }

    return (
        <div className='min-h-[80vh] py-12 px-4 md:px-12 lg:px-24 flex items-center justify-center text-white'>
            <div className='bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl w-full max-w-4xl p-6 md:p-10'>
                
                {/* Top Profile Header (Mobile Friendly Layout) */}
                <div className='flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-slate-800 text-center md:text-left'>
                    <img 
                        className='w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-pink-600 shadow-xl shadow-pink-600/20' 
                        src={user?.photoURL || "https://placehold.co/150"} 
                        alt="User Profile" 
                    />
                    <div className='space-y-2'>
                        <div className='flex flex-wrap items-center justify-center md:justify-start gap-2'>
                            <h1 className='text-2xl md:text-3xl font-bold tracking-tight'>{user?.displayName || "Unnamed User"}</h1>
                            <span className='badge badge-secondary bg-pink-600/20 text-pink-400 border-pink-600/40 text-xs px-3 py-2 flex items-center gap-1'>
                                <FiUserCheck /> Verified Creator
                            </span>
                        </div>
                        <p className='text-slate-400 text-sm flex items-center justify-center md:justify-start gap-2'>
                            <FiMail className='text-pink-500' /> {user?.email || "No email available"}
                        </p>
                        <p className='text-xs text-slate-500 font-mono'>
                            UID: {user?.uid}
                        </p>
                    </div>
                </div>

                {/* Dashboard Stats / Feature Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 my-8'>
                    {/* Models Uploaded Stat Card */}
                    <div className='bg-slate-950/60 border border-slate-800/80 p-6 rounded-2xl flex items-center justify-between'>
                        <div>
                            <p className='text-slate-400 text-sm font-medium'>Total Models Uploaded</p>
                            <h3 className='text-3xl font-extrabold text-pink-500 mt-1'>{modelCount}</h3>
                        </div>
                        <div className='p-4 bg-pink-600/10 rounded-xl text-pink-500 text-2xl'>
                            <FiBox />
                        </div>
                    </div>

                    {/* Quick Link Card to My Models */}
                    <div className='bg-slate-950/60 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between'>
                        <div>
                            <p className='text-slate-400 text-sm font-medium'>Manage Content</p>
                            <h4 className='text-lg font-semibold text-white mt-1'>View Your Uploaded Models</h4>
                        </div>
                        <Link 
                            to="/my-models" 
                            className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors'
                        >
                            Go to My Models <FiArrowRight />
                        </Link>
                    </div>
                </div>

                {/* Account Activity / Metadata Section */}
                <div className='space-y-4 pt-2'>
                    <h2 className='text-lg font-bold text-slate-200 flex items-center gap-2'>
                        <FiShield className='text-pink-500' /> Account Security & Metadata
                    </h2>
                    
                    <div className='bg-slate-950/40 border border-slate-800 rounded-2xl p-6 space-y-3 text-sm text-slate-300'>
                        <div className='flex flex-col sm:flex-row justify-between border-b border-slate-800/60 pb-3'>
                            <span className='text-slate-400 flex items-center gap-2'>
                                <FiClock /> Account Creation Time:
                            </span>
                            <span className='font-medium text-white mt-1 sm:mt-0'>
                                {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleString() : 'N/A'}
                            </span>
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between pt-1'>
                            <span className='text-slate-400 flex items-center gap-2'>
                                <FiClock /> Last Login Time:
                            </span>
                            <span className='font-medium text-white mt-1 sm:mt-0'>
                                {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;