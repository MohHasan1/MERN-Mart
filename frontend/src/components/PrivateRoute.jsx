import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    // subscribe to auth slice to get access to userInfo
    const { userInfo } = useSelector( state => state.auth);

    return userInfo ? <Outlet /> : <Navigate to='/login' replace/>;
}

export default PrivateRoute;
