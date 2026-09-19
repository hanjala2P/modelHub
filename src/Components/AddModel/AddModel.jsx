import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2'; 

const AddModel = () => {
  const { loading, setLoading, user } = use(AuthContext);

  const handleAddModel = (e) => {
    e.preventDefault();
    
   
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this 3D model?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel"
    }).then((result) => {

      if (result.isConfirmed) {
        const form = e.target;
        const modelName = form.modelName.value;
        const category = form.category.value;
        const description = form.description.value;
        const thumbnail = form.thumbnail.value;

        const newModel = {
          modelName,
          category,
          description,
          thumbnail,
          createdAt: new Date(),
          download: 0,
          created_by: user?.email
        };

        console.log("New Model Data:", newModel);
        setLoading(true);

    
        fetch('http://localhost:3000/models', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newModel)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoading(false);
            
          
            Swal.fire({
              title: "Success!",
              text: "Successfully added a model!",
              icon: "success",
              confirmButtonText: "OK"
            });

            form.reset(); 
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error"
            });
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center items-center">
      <div className="card w-full max-w-xl shadow-2xl bg-base-100 border border-gray-700/50">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-4 text-primary">Add New 3D Model</h2>
          
          <form onSubmit={handleAddModel} className="space-y-4">
            
            {/* Model Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Model Name</span>
              </label>
              <input 
                type="text" 
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
                defaultValue="" 
                required
              >
                <option value="" disabled>Select category</option>
                <option value="Sci-Fi">Sci-Fi & Cyberpunk</option>
                <option value="Characters">Characters & Creatures</option>
                <option value="Vehicles">Vehicles & Spaceships</option>
                <option value="Architecture">Architecture & Environment</option>
                <option value="Props">Props & Weapons</option>
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
                className="textarea textarea-bordered h-34 focus:textarea-primary w-full" 
                placeholder="Write details about the 3D model, polygon count, textures, etc." 
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full text-lg">
                {loading ? "Adding Model..." : "Add Model"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModel;