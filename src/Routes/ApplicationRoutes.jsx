import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import Register from '../Components/Auth/Register';
import Profile from '../Components/Auth/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import SignIn from '../Components/Auth/SignIn';
import CreateList from '../Pages/CreateList';



const ApplicationRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />}></Route>
                    <Route exact path="/Register" element={<Register />}></Route>
                    <Route exact path="/SignIn" element={<SignIn />}></Route>

                    {/* Protected Routes */}
                    <Route exact path="/Profile" element={<ProtectedRoutes />}>
                        <Route exact path='/Profile' element={<Profile />}></Route>
                    </Route>

                    <Route exact path='/CreateList' element={<ProtectedRoutes />}>
                        <Route exact path="/CreateList" element={<CreateList />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default ApplicationRoutes;


