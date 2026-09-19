import React from 'react';
import { Link } from 'react-router';

const ModelCard = ({ model }) => {
    
    const { name, modelName, thumbnail, thumnail, category, description, _id, model_id, created_by } = model;
    
    const displayName = modelName || name;
    const displayImage = thumbnail || thumnail;
    
  
    const targetId = model_id || _id;

    return (
      <div className="card bg-base-100 w-96 shadow-sm border border-slate-800 bg-slate-900/80 backdrop-blur-xl text-white">
        <figure className="h-48 overflow-hidden">
          <img
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            src={displayImage || 'https://via.placeholder.com/400'} 
            alt={displayName || 'Model Image'} 
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex flex-wrap items-center gap-2">
            <span>{displayName || 'Untitled Model'}</span>
            <div className="badge badge-secondary whitespace-nowrap bg-pink-600 border-none">{category || 'General'}</div>
          </h2>
          <p className='text-slate-400 text-sm'>{created_by}</p>
          <p className='text-slate-300 text-sm line-clamp-2'>{description}</p>
          <div className="card-actions justify-end mt-4">
            <Link 
                to={`/viewDetails/${targetId}`} 
                className='btn hover:bg-pink-500 ease-in w-full bg-pink-600 text-white border-none'
            >
                View details
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ModelCard;