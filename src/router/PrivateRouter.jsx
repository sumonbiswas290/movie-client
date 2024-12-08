import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvide';

const PrivateRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext);
    if(loading ){
        return <div className='flex justify-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if(user && user?.email){
        return children;
    }
    return <Navigate to={`/signin`}></Navigate>
};

export default PrivateRoute;