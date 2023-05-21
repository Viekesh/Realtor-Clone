import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';

const ApplicationRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default ApplicationRoutes;


