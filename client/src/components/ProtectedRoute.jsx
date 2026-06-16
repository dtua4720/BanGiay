import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import Context from '../store/Context';

/**
 * Wrap a route element to require authentication (and optionally admin role).
 *
 *   <ProtectedRoute>{<Profile />}</ProtectedRoute>           // any logged-in user
 *   <ProtectedRoute requireAdmin>{<Admin />}</ProtectedRoute> // admin only
 *
 * Note: this is a UX-layer guard only (hides UI from users who shouldn't see it
 * and redirects them). The backend MUST still enforce `authUser` / `authAdmin`
 * on every protected API route — that is the real security boundary.
 */
function ProtectedRoute({ children, requireAdmin = false }) {
    const { dataUser, isAuthLoading } = useContext(Context);

    if (isAuthLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    const isLoggedIn = Boolean(dataUser?._id);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !dataUser?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
