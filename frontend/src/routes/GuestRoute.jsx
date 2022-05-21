import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
	const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
	return isLoggedIn ? <Navigate to="/rooms" /> : children;
};

export default GuestRoute;
