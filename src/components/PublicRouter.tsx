import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase"; // Assuming Firebase authentication

interface PublicRouteProps {
  component: React.ComponentType<any>;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  return auth.currentUser ? <Navigate to="/home" /> : <Component />;
};

export default PublicRoute;
