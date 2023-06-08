import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Spinner from '../utils/Spinner';
import useAdmin from '../hooks/useAdmin';


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email); //!isAdminLoading
    const location = useLocation();

    if (loading || isAdminLoading) {  
        return <Spinner></Spinner>
        // <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;


//*=================================================
// !**! Almost the same thing as private routes.!**! 
