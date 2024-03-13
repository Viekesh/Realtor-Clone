import React from 'react';
import { CheckAuthStatus } from '../Components/Auth/Hook/CheckAuthStatus';
import Spinner from '../Components/CommonModules/Spinner/Spinner';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

  const [loggedIn, checkingStatus] = CheckAuthStatus();

  if (checkingStatus) {
    return <div className='private_route'><Spinner /></div>
  };

  return loggedIn ? <Outlet /> : <Navigate to="/SignIn" />
}

export default ProtectedRoutes;


