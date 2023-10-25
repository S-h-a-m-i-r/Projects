import React, { useCallback, useContext, useEffect } from "react";
import useAuth from "hooks/useAuth";
import { Navigate } from "react-router-dom";
import { checkSession } from "libs/session";
import { AuthContext } from "context/AuthContext";

type AuthGuardProps = {
	children: React.ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
	// const { isAuthenticated, isInitialized } = useAuth();
	// const { logout } = useContext(AuthContext);

	// // Just for double check, Sometime user delete token manually from the localstorage.
	// const { isAuthenticated: hasSessionToken } = checkSession();

	// const userSession = useCallback(() => {
	// 	if (hasSessionToken) return;

	// 	logout?.();
	// }, [hasSessionToken, logout]);

	// useEffect(() => {
	// 	userSession();
	// }, [userSession]);

	// if (isInitialized && !isAuthenticated) {
	// 	return <Navigate replace to="/login" />;
	// }

	return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthGuard;
