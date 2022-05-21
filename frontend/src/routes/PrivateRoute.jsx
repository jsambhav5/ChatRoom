import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
	return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
