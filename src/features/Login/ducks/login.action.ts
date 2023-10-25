import { createAsyncThunk } from "@reduxjs/toolkit";

import httpClient from "../../../http";
import { AxiosError } from "axios";

const loginUser = createAsyncThunk("login/User", async ({ ...args }: any) => {
	try {
		const { response, error } = await httpClient({
			method: "POST",
			path: {
				url: "USER_AUTH",
			},
			data: args,
		});

		if (error) {
			// Show Some MUI Toast for error here
		}

		return response?.data;
	} catch (err: Error | any) {
		const error = err as AxiosError;
		if (error.message) {
			return error.message;
		}
		return err;
	}
});

export { loginUser };
