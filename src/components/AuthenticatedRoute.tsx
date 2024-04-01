import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface AuthenticatedRouteProps {
  children: JSX.Element;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated); // Update based on your auth state
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /signin page, but save the current location they were trying to go to
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
