import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ allowedRoles }) => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const location = useLocation()

    return [auth?.data?.role]?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.data ? (
        <Navigate to="/notfound" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
