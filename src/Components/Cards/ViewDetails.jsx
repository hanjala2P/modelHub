import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { FiCheck, FiShoppingBag, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaDownload } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';

const ViewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [model, setModel] = useState({});
    const { loading, setLoading, user } = use(AuthContext);
    const [refetch, setRefetch] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const handleDownload = () => {
        const finalModel = {
            modelName: model.modelName,
            downloads: model.downloads || 0,
            created_by: model.created_by,
            description: model.description,
            thumbnail: model.thumbnail,
            created_date: new Date(),
            downloaded_by: user?.email || "anonymous"
        };

        fetch(`http://localhost:3000/downloads/${model._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalModel)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            toast.success('Successfully downloaded!');
            setRefetch(!refetch);
        })
        .catch(err => { console.log(err); });
    };

    // Model data fetch ebong cart-e age theke ache kina check kora
    useEffect(() => {
        if (id) {
            const headers = {};
            if (user?.accessToken) {
                headers.Authorization = `Bearer ${user.accessToken}`;
            }

            fetch(`http://localhost:3000/models/${id}`, { headers })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setModel(data.result);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });

            if (user?.email && user?.accessToken) {
                fetch(`http://localhost:3000/cart?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    },
                })
                .then(res => res.json())
                .then(cartData => {
                    if (Array.isArray(cartData)) {
                        const exists = cartData.some(item => item.model_id === id);
                        if (exists) {
                            setIsInCart(true);
                        }
                    }
                })
                .catch(err => console.log(err));
            }
        }
    }, [user, id, refetch, setLoading]);

    const handleAddToCart = () => {
        if (isInCart) return;

        if (!user?.accessToken) {
            toast.error('Please login first to add items to cart!');
            return;
        }

        const cartData = {
            model_id: model._id,
            modelName: model.modelName,
            thumbnail: model.thumbnail,
            price: model.price || 0,
            category: model.category,
            user_email: user.email
        };

        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(cartData),
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to add to cart');
            }
            return data;
        })
        .then(data => {
            if (data.insertedId || data.acknowledged) {
                setIsInCart(true);
                toast.success('Product added to cart successfully!', {
                    position: 'top-right',
                    style: {
                        background: '#1f2937',
                        color: '#fff',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    iconTheme: {
                        primary: '#ec4899',
                        secondary: '#fff',
                    },
                });

                window.dispatchEvent(new CustomEvent('cartDataChanged'));
            }
        })
        .catch(err => {
            console.error(err);
            toast.error(err.message || 'Failed to add to cart');
        });
    };

    const handleDelete = async () => {
        if (!user?.accessToken) {
            toast.error('Please login first to delete!');
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:3000/models/${model._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.accessToken}`
                        },
                    });
                    const data = await res.json();
                    
                    if (data.success) {
                        navigate('/allModels');
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    } else {
                        toast.error(data.message || "Failed to delete");
                    }
                } catch (err) {
                    console.error(err);
                    toast.error("Something went wrong!");
                }
            }
        });
    };

  
    if (loading) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-slate-950'>
                <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white mt-4 font-medium tracking-wide">Loading details...</p>
            </div>
        );
    }

    return (
        <div className='mx-6 md:mx-24 lg:mx-48 py-12 min-h-screen flex items-center justify-center'>
            <Toaster />

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="card bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl overflow-hidden w-full max-w-4xl"
            >
                <figure className='relative overflow-hidden h-96 group'>
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className='w-full h-full object-cover'
                        src={model?.thumbnail} 
                        alt={model?.name || 'Model Image'} 
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent'></div>
                    
                    <div className="absolute top-4 left-4 badge badge-secondary font-medium px-4 py-3 text-sm tracking-wide shadow-lg backdrop-blur-md bg-pink-600/90 border-none">
                        {model?.category}
                    </div>
                </figure>

                <div className="card-body p-8 md:p-10">
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="card-title text-3xl font-bold tracking-tight text-white mb-2"
                    >
                        {model?.modelName}
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-slate-400 text-base leading-relaxed bg-gray-700 pb-6 rounded-lg py-2 px-2"
                    >
                        {model?.description}
                    </motion.p>
                    
                    <span className='text-lg text-white font-medium'> 
                        Downloaded : {model?.downloads || 0} 
                    </span>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800"
                    >
                    
                        {user?.email && user?.email === model?.created_by && (
                            <>
                                <Link 
                                    to={`/update-model/${model._id}`}
                                    className='btn bg-sky-600 hover:bg-sky-500 border-none text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-sky-600/20 transition-all duration-300 flex items-center gap-2'
                                >
                                    <FiEdit className="text-lg" /> Update
                                </Link>

                                <button 
                                    onClick={handleDelete}
                                    className='btn bg-rose-600 hover:bg-rose-500 border-none text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-rose-600/20 transition-all duration-300 flex items-center gap-2'
                                >
                                    <FiTrash2 className="text-lg" /> Delete
                                </button>
                            </>
                        )}

                        <button onClick={handleDownload} className='btn btn-success text-white border-none flex items-center gap-2'>
                            <FaDownload /> Download
                        </button>
                        
                        <button 
                            onClick={handleAddToCart}
                            disabled={isInCart}
                            className={`btn px-6 py-3 rounded-xl font-medium transition-all duration-300 border-none flex items-center gap-2 ml-auto cursor-pointer ${
                                isInCart 
                                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed shadow-inner' 
                                    : 'bg-white text-slate-900 hover:bg-slate-100 shadow-xl'
                            }`}
                        >
                            {isInCart ? (
                                <>
                                    <FiCheck className='text-lg text-pink-500' /> Already in Cart
                                </>
                            ) : (
                                <>
                                    <FiShoppingBag className='text-lg text-pink-600' /> Add to Cart
                                </>
                            )}
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ViewDetails;