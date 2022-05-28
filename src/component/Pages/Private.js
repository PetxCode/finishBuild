import React from "react";
import { useSelector } from "react-redux";
import decoded from "jwt-decode";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
	const myUser = useSelector((state) => state.user);

	const token = myUser?.token;

	if (!token) {
		return <Navigate to="/signup" />;
	}
	const { isVerify, isAdmin } = decoded(token);
	return isVerify && isAdmin ? (
		children
	) : isVerify ? (
		<Navigate to="/user" />
	) : null;
};

export default Private;
