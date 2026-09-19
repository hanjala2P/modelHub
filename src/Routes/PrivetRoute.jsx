import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><span className='loading loading-spinner text-success loading-lg'></span></div>;
    }

    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} to='/register'></Navigate>;
};

export default PrivetRoute;