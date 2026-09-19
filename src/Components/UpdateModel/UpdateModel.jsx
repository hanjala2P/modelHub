import React, { use, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const UpdateModel = () => {
    const { loading, setLoading } = use(AuthContext);
    const data = useLoaderData();
    const model = data.result;
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState({
        modelName: '',
        category: '',
        thumbnail: '',
        description: ''
    });

    useEffect(() => {
        if (model) {
            const initialName = model?.modelName || model?.name || '';
            const initialCat = model?.category || '';
            const initialThumb = model?.thumbnail || model?.thumnail || '';
            const initialDesc = model?.description || '';

            setSelectedCategory(initialCat);
            setFormData({
                modelName: initialName,
                category: initialCat,
                thumbnail: initialThumb,
                description: initialDesc
            });
        }
    }, [model]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'category') {
            setSelectedCategory(value);
        }
    };

    const handleConfirmUpdate = () => {
        const modal = document.getElementById('update_confirm_modal');
        if (modal) modal.close();

        setLoading(true);

        fetch(`http://localhost:3000/models/${model._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoading(false);
            
            Swal.fire({
                icon: "success",
                title: "Successfully update your model!",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/allModels');
            }, 1500);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Failed to update model!",
                showConfirmButton: false,
                timer: 1500
            });
        });
    };

    const handleDelete = () => {
        const modal = document.getElementById('update_confirm_modal');
        if (modal) modal.close();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                fetch(`http://localhost:3000/models/${model._id}`, {
                    method: "DELETE",
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setLoading(false);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your model has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    setTimeout(() => {
                        navigate('/allModels');
                    }, 1500);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Failed to delete model!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            }
        });
    };

    const onSubmitClick = (e) => {
        e.preventDefault();
        const modal = document.getElementById('update_confirm_modal');
        if (modal) modal.showModal();
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center items-center">
            <div className="card w-full max-w-xl shadow-2xl bg-base-100 border border-gray-700/50">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-4 text-primary">Update your Model</h2>
                    
                    <form onSubmit={onSubmitClick} className="space-y-4">
                        
                        {/* Model Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Model Name</span>
                            </label>
                            <input 
                                type="text" 
                                value={formData.modelName}
                                onChange={handleInputChange}
                                name="modelName" 
                                placeholder="e.g. Cyberpunk Mecha Warrior" 
                                className="input input-bordered w-full focus:input-primary" 
                                required 
                            />
                        </div>

                        {/* Category Select Option */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Category</span>
                            </label>
                            <select 
                                name="category" 
                                className="select select-bordered w-full focus:select-primary" 
                                value={selectedCategory} 
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Sci-Fi & Cyberpunk">Sci-Fi & Cyberpunk</option>
                                <option value="Characters & Creatures">Characters & Creatures</option>
                                <option value="Vehicles & Spaceships">Vehicles & Spaceships</option>
                                <option value="Architecture & Environment">Architecture & Environment</option>
                                <option value="Props & Weapons">Props & Weapons</option>
                                <option value="Characters">Characters</option>
                            </select>
                        </div>

                        {/* Thumbnail URL Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Thumbnail Image URL</span>
                            </label>
                            <input 
                                type="url" 
                                name="thumbnail" 
                                value={formData.thumbnail}
                                onChange={handleInputChange}
                                placeholder="https://i.ibb.co/... or image link" 
                                className="input input-bordered w-full focus:input-primary" 
                                required 
                            />
                        </div>

                        {/* Description Box */}
                        <div className="form-control flex flex-col">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea 
                                name="description" 
                                value={formData.description}
                                onChange={handleInputChange}
                                className="textarea textarea-bordered h-34 focus:textarea-primary w-full" 
                                placeholder="Write details about the 3D model, polygon count, textures, etc." 
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6 flex flex-row gap-2">
                            <button type="submit" className="btn btn-primary flex-1 text-lg">
                                Review & Update
                            </button>
                            <button type="button" onClick={handleDelete} className="btn btn-error text-lg px-6">
                                Delete
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Confirmation & Preview Modal */}
            <dialog id="update_confirm_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-lg bg-base-100 text-center sm:text-left">
                    <h3 className="font-bold text-2xl text-primary mb-2">Review Your Changes</h3>
                    <p className="text-sm text-gray-400 mb-4">Please verify the updated information before saving:</p>
                    
                    {/* Preview Card */}
                    <div className="bg-base-200 p-4 rounded-xl space-y-3 border border-gray-700 text-left">
                        {formData.thumbnail && (
                            <div className="h-40 w-full overflow-hidden rounded-lg bg-base-300">
                                <img 
                                    src={formData.thumbnail} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL"; }}
                                />
                            </div>
                        )}
                        <div>
                            <span className="text-xs uppercase tracking-wider text-secondary font-bold">Category</span>
                            <p className="font-semibold text-sm">{formData.category || "Not selected"}</p>
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-wider text-secondary font-bold">Model Name</span>
                            <h4 className="text-lg font-bold">{formData.modelName || "No name provided"}</h4>
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-wider text-secondary font-bold">Description</span>
                            <p className="text-sm text-gray-300 line-clamp-3">{formData.description || "No description provided"}</p>
                        </div>
                    </div>

                    <div className="modal-action mt-6">
                        <form method="dialog" className="flex gap-2 w-full">
                            <button className="btn btn-error flex-1">Cancel</button>
                            <button 
                                type="button" 
                                onClick={handleConfirmUpdate} 
                                className="btn btn-primary flex-1"
                            >
                                {loading ? "Updating..." : "Confirm Update"}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UpdateModel;