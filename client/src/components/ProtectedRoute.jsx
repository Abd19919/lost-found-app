import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) return <Navigate to="/login" replace />;
  if (requiredRole && storedUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;