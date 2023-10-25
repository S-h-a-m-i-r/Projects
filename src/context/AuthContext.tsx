import { AxiosError } from "axios";
import useLogin from "hooks/useLogin";
import { checkSession } from "libs/session";
import { createContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteLocalStorage, getLocalStorage, setLocalStorage } from "utils/localStorage";

type AuthContextType = InitialStateType & {
	login?: () => Promise<void>;
	logout?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	isInitialized: false,
	user: null,
});

type AuthContextProviderProps = {
	children: React.ReactNode;
};

type InitialStateType = {
	isAuthenticated: boolean;
	isInitialized: boolean;
	user: any; //TODO: for now we will keep user type any, but once we integrate api we will define user type
};

const INITIALIZE = "[USER] INITIALIZE";
const SIGNIN = "[USER] SIGNIN";
const LOGOUT = "[USER] LOGOUT";

type Action = {
	payload?: InitialStateType;
	type: string;
};

const INITIAL_STATE: InitialStateType = {
	isAuthenticated: false,
	isInitialized: false,
	user: null,
};

const AuthReducer = (state: any, actions: Action): InitialStateType => {
	switch (actions.type) {
		case INITIALIZE:
			return {
				...state,
				...actions.payload,
				isInitialized: true,
			};

		case SIGNIN:
			return {
				...state,
				...actions.payload,
				isAuthenticated: actions.payload?.isAuthenticated || false,
				user: actions.payload?.user || null,
			};

		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};

		default:
			return state;
	}
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
	const navigate = useNavigate();
	const location = useLocation();

	const { onLogin, onAuthorizeUser } = useLogin();

	const login = async () => onLogin();

	const logout = async () => {
		try {
			deleteLocalStorage("TOKEN");

			dispatch({
				type: LOGOUT,
			});
		} catch (err) {
			const error = err as AxiosError;
			throw error;
		}
	};

	useEffect(() => {
		let token = "";
		if (window.location.hash && !getLocalStorage("TOKEN")) {
			token = onAuthorizeUser() || "";
			setLocalStorage("TOKEN", token);
		}

		// const initialize = async () => {
		// 	try {
		// 		// TODO: Add loader to show some cool UI
		// 		const { isAuthenticated, dataValues } = checkSession(token)

		// 		// Check authentication
		// 		if (isAuthenticated) {
		// 			dispatch({
		// 				type: SIGNIN,
		// 				payload: {
		// 					isInitialized: true,
		// 					isAuthenticated: true,
		// 					user: { ...dataValues },
		// 				},
		// 			})

		// 			// TODO: get profile if the dataValues is not giving full details
		// 			return navigate('/dashboard')
		// 		} else {
		// 			return navigate('/')
		// 		}
		// 	} catch (err) {
		// 		const error = err as AxiosError
		// 		throw error
		// 	}
		// }

		// // Initilize the user
		// initialize()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location?.hash]);

	return <AuthContext.Provider value={{ ...state, login, logout }}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
