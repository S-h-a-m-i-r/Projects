import jwtDecode from "jwt-decode";
import { getLocalStorage } from "utils/localStorage";

type JWTDecodeType = {
	exp: number;
	dataValues: any; // TODO: will change from any to actual type later
};

type SessionType = {
	isAuthenticated: boolean;
	dataValues: any;
};

const getToken = (): string => {
	return getLocalStorage("TOKEN") || "";
};

const checkSession = (accessToken?: string): SessionType => {
	const token = accessToken || getToken();
	if (!token) {
		return {
			isAuthenticated: false,
			dataValues: null,
		};
	}

	const decoded = jwtDecode(token) as JWTDecodeType;
	const now = Date.now();

	return {
		isAuthenticated: now > decoded.exp,
		dataValues: decoded,
	};
};

export { checkSession };
