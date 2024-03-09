import { Route, Routes } from "react-router-dom";
import LandingPage from "../Components/PageComponents/LandingPage/LandingPage";
import Authenticate from "../Components/FeaturedComponents/Authentication/Authenticate";
import Register from "../Components/FeaturedComponents/Authentication/Register";




const ReactRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage />}></Route>
                <Route exact path="/Register" element={<Register />}></Route>
                <Route exact path="/Authenticate" element={<Authenticate />}></Route>
            </Routes>
        </>
    )
}



export default ReactRoutes;