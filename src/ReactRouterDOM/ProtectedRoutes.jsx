import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Components/CommonModules/Spinner/Spinner";
import CheckAuthStatus from "../Components/FeaturedComponents/Authentication/CustomHook/CheckAuthStatus"




const ProtectedRoutes = () => {

    const [loggedIn, checkingStatus] = CheckAuthStatus();

    if (checkingStatus) {
        return <div className="private_routes"><Spinner /></div>
    };

    return loggedIn ? <Outlet /> : <Navigate to="/Authenticate" />
};



export default ProtectedRoutes;