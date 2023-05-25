import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import Register from '../Components/Auth/Register';

const ApplicationRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />}></Route>
                    <Route exact path="/Register" element={<Register />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default ApplicationRoutes;


