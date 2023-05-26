import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import Register from '../Components/Auth/Register';
import Profile from '../Components/Auth/Profile';

const ApplicationRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />}></Route>
                    <Route exact path="/Register" element={<Register />}></Route>
                    <Route exact path='/Profile' element={<Profile />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default ApplicationRoutes;


