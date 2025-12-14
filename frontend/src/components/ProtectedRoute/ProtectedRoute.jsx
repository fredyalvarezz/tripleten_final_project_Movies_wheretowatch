import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
