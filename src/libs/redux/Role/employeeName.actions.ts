// libs/redux/employeesName/employeeName.actions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "../error/error.reducer";
import httpClient from "../../../http";

const baseURL = process.env.REACT_APP_TOSS_BASE_URL;

const getEmployeeDesignation = createAsyncThunk("employees/getEmployeeDesignation", async (_, thunkApi) => {
	try {
		const { response, error } = await httpClient({
			newBaseUrl: baseURL,
			method: "GET",
			path: {
				url: "EMPLOYEE_DESIGNATION",
			},
		});

		if (error) {
			thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkApi.rejectWithValue("");
		}

		return response.data;
	} catch (error: any) {
		thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		return thunkApi.rejectWithValue("");
	}
});

export { getEmployeeDesignation };
