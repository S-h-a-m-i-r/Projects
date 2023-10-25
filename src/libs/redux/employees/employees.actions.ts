import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../http";
import { setError } from "../error/error.reducer";

const baseURL = process.env.REACT_APP_TOSS_BASE_URL;

const getEmployeeList = createAsyncThunk("employe_list", async (_, thunkApi) => {
	try {
		const { response, error } = await httpClient({
			newBaseUrl: baseURL,
			method: "GET",
			path: {
				url: "EMPLOYEES",
			},
		});

		if (error) {
			thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkApi.rejectWithValue("");
		}

		return thunkApi.fulfillWithValue(response.data);
	} catch (error: any) {
		thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		return thunkApi.rejectWithValue("");
	}
});

export { getEmployeeList };
