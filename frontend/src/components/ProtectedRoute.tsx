
import { getToken } from "@/utils/auth"
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }
;
    return <Outlet />

};

export default ProtectedRoute