import React from "react";
import { useSelector } from "react-redux";
import decoded from "jwt-decode";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
	const myUser = useSelector((state) => state.user);
	console.log(myUser);

	const token = myUser.token;

	const { isVerify, isAdmin } = decoded(token);

	console.log(isVerify, isAdmin);
	return isVerify && isAdmin ? (
		children
	) : isVerify ? (
		<Navigate to="user" />
	) : (
		<Navigate to="signup" />
	);
};

export default Private;
