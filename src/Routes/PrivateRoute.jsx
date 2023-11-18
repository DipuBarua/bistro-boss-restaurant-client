import { useContext } from "react";
import { AuthContext } from "../contextProviders/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    console.log(user);

    if (loader) {
        return <div className=" min-h-screen text-center">
            <progress className="progress w-56 my-56 bg-red-700"></progress>
        </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;