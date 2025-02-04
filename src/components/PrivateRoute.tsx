import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase"; // Assuming Firebase authentication

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  return auth.currentUser ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
