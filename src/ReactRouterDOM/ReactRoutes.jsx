import { Route, Routes } from "react-router-dom";
import LandingPage from "../Components/PageComponents/LandingPage/LandingPage";
import Authenticate from "../Components/FeaturedComponents/Authentication/Authenticate";
import Register from "../Components/FeaturedComponents/Authentication/Register";
import Profile from "../Components/FeaturedComponents/Authentication/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateList from "../Components/FeaturedComponents/AddProp/CreateList";




const ReactRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage />}></Route>
                <Route exact path="/Register" element={<Register />}></Route>
                <Route exact path="/Authenticate" element={<Authenticate />}></Route>

                <Route exact path="/Profile" element={<ProtectedRoutes />}>
                    <Route exact path="/Profile" element={<Profile />}></Route>
                </Route>

                <Route exact path="/CreateList" element={<ProtectedRoutes />}>
                    <Route exact path="/CreateList" element={<CreateList />}></Route>
                </Route>
            </Routes>
        </>
    )
}



export default ReactRoutes;