import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FiMinus, FiShoppingCart } from 'react-icons/fi';
import { IoIosAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';

const SaveItems = () => {
    const { user } = React.use(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);

    // Database theke user-er cart items fetch kora
    useEffect(() => {
        const fetchCartItems = () => {
            if (user?.email && user?.accessToken) {
                fetch(`http://localhost:3000/cart?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    const itemsWithQuantity = data.map(item => ({ ...item, quantity: item.quantity || 1 }));
                    setCartItems(itemsWithQuantity);
                    setLoading(false);
                });
            }
        };

        fetchCartItems();

       
        const handleCartUpdate = () => {
            fetchCartItems();
        };
        window.addEventListener('cartDataChanged', handleCartUpdate);

        return () => {
            window.removeEventListener('cartDataChanged', handleCartUpdate);
        };
    }, [user, refetch]);

    // Quantity Increment
    const handleIncrement = (id) => {
        setCartItems(prev => 
            prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
        );
    };

    // Quantity Decrement
    const handleDecrement = (id) => {
        setCartItems(prev => 
            prev.map(item => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
        );
    };

    const handleBuyNow = () => {
        Swal.fire({
            title: "Success!",
            text: "Proceeding to checkout!",
            icon: "success",
            confirmButtonColor: "#4f46e5"
        });
    };

    // Database theke item delete kora
    const handleDeleteClick = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this item from your cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#334155",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/cart/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        setRefetch(!refetch);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your item has been removed from the cart.",
                            icon: "success",
                            timer: 1200,
                            showConfirmButton: false
                        });
                    }
                })
                .catch(err => console.error(err));
            }
        });
    };

    // Total price calculate kora
    const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price || 150) * item.quantity), 0);

    if (loading) {
        return <div className='min-h-[400px] flex items-center justify-center text-slate-400 text-sm'>Loading cart...</div>;
    }

    return (
        <div className='mx-auto w-full h-full p-5 text-white flex flex-col justify-between bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl'>
            <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 shrink-0'>
                    <h3 className='font-bold text-xl tracking-wide flex items-center gap-2 text-slate-100'>
                        <FiShoppingCart className='text-pink-500' /> My Cart
                    </h3>
                    <span className='text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-medium'>
                        {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                
                {cartItems.length === 0 ? (
                    <div className='flex-1 flex flex-col items-center justify-center py-16 text-slate-500'>
                        <FiShoppingCart className='text-4xl mb-3 text-slate-600 animate-pulse' />
                        <p className='text-base font-medium text-slate-400'>Your cart is empty!</p>
                        <p className='text-xs text-slate-600 mt-1'>Explore models and add to cart.</p>
                    </div>
                ) : (
                    
                    <div className='flex-1 flex flex-col gap-3.5 overflow-y-auto pr-1 custom-scrollbar max-h-[calc(100vh-250px)]'>
                        {cartItems.map((item) => (
                            <div 
                                key={item._id} 
                                className='group relative flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-md shrink-0'
                            >
                                {/* Thumbnail */}
                                <Link to={`/viewDetails/${item.model_id}`} className='shrink-0'>
                                    <img 
                                        className='w-16 h-16 rounded-lg object-cover bg-slate-800 group-hover:scale-105 transition-transform duration-200' 
                                        src={item.thumbnail || "https://via.placeholder.com/150"} 
                                        alt={item.modelName || item.name} 
                                    />
                                </Link>

                                {/* Details */}
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-start justify-between gap-2'>
                                        <Link 
                                            to={`/viewDetails/${item.model_id}`}
                                            className='font-semibold text-sm text-slate-200 hover:text-pink-400 transition-colors line-clamp-1'
                                            title={item.modelName}
                                        >
                                            {item.modelName}
                                        </Link>
                                        <button 
                                            onClick={() => handleDeleteClick(item._id)}
                                            className='text-slate-500 hover:text-rose-500 p-1 transition-colors cursor-pointer shrink-0'
                                            title="Remove item"
                                        >
                                            <MdDelete className='text-base' />
                                        </button>
                                    </div>

                                    <div className='flex items-center justify-between mt-2'>
                                        <span className='text-xs font-semibold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded'>
                                            ৳{item.price || 150}
                                        </span>

                                        {/* Quantity Controls */}
                                        <div className='flex items-center gap-2 bg-slate-950/60 px-2 py-0.5 rounded-lg border border-slate-800'>
                                            <button 
                                                onClick={() => handleDecrement(item._id)}
                                                className='text-slate-400 hover:text-white p-0.5 transition cursor-pointer'
                                            >
                                                <FiMinus className='text-xs' />
                                            </button>
                                            <span className='font-semibold text-xs w-4 text-center text-slate-200'>{item.quantity}</span>
                                            <button 
                                                onClick={() => handleIncrement(item._id)}
                                                className='text-slate-400 hover:text-white p-0.5 transition cursor-pointer'
                                            >
                                                <IoIosAdd className='text-sm' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className='mt-4 pt-4 border-t border-slate-800/80 bg-slate-950/40 shrink-0'>
                    <div className='flex justify-between items-center mb-4 text-sm font-medium'>
                        <span className='text-slate-400'>Total Amount:</span>
                        <span className='text-emerald-400 text-lg font-bold'>৳{totalPrice}</span>
                    </div>

                    <button 
                        onClick={handleBuyNow}
                        className='w-full bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold transition duration-200 shadow-lg shadow-pink-600/20 cursor-pointer active:scale-[0.98]'
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default SaveItems;