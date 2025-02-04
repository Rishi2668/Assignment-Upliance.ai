
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRouter";
import SignIn from "./pages/signIn"
import SignUp from "./pages/SignUp";

const App: React.FC = () => {
  const user = null;
  return (
  
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/home" : "/signin"} />} />
        <Route path="/signin" element={<PublicRoute component  ={SignIn} />} />
        <Route path="/signup" element={<PublicRoute component={SignUp} />} />
        <Route path="/home" element={<PrivateRoute component={Home} />} />
      </Routes>

  );
};

export default App;
