import React, { useEffect } from "react";
import { Component ,useState} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, login } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        login();
      }
      setIsLoading(false);
    };

    checkToken();
  }, [login]);

  if (isLoading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
