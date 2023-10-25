import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import generateEndpoint, { ApiPath } from "./generateEndpoint";
import { getLocalStorage } from "utils/localStorage";
import { deleteLocalStorage } from "utils/localStorage";

type Payload = {
	newBaseUrl?: string;
	method: Method;
	path: ApiPath;
	data?: Object;
	query?: string;
};

const httpClient = async (payload: Payload) => {
	try {
		let baseURL = `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_API_VERSION}`;
		if (payload.newBaseUrl) {
			baseURL = payload.newBaseUrl;
		}
		const http = axios.create({
			baseURL,
		});

		const { path, method, data, query } = payload;
		const url = generateEndpoint(path);
		const options: AxiosRequestConfig = {
			headers: {
				"Content-Type": "application/json",
			},
			method,
			url,
		};

		if (query && method === "GET") {
			options.params.query = JSON.stringify(query);
		}

		if (data && method !== "GET") {
			options.data = JSON.stringify(data);
		}

		//TODO: we will grab token here from cookies
		// we will set token on then headers here
		const token = getLocalStorage("TOKEN");
		if (token) {
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${token.replaceAll('"', "")}`,
			};
		}
		const response = await http(options);

		return { response, error: null };
	} catch (err: any) {
		const { message, status } = err as AxiosError;

		// For api call that gives 401 status code. which means user is not authenticated
		// if (err?.response?.status === 401) {
		// 	deleteLocalStorage("TOKEN");
		// 	window.location.replace("/");
		// }

		/**
		 * Error logic will be handle here
		 */
		let errorMessage = message;
		const { error = "" } = err.response.data || {};
		if (error) {
			errorMessage = error;
		}

		return {
			response: null,
			error: {
				message: errorMessage,
				status,
			},
		};
	}
};

export default httpClient;
