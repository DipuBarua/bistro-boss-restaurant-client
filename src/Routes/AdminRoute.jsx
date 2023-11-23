import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, loader } = useAuth();
    const location = useLocation();

    if (loader || isAdminLoading) {
        return <div className=" min-h-screen text-center">
            <progress className="progress w-56 my-56 bg-red-700"></progress>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
};

export default AdminRoute;