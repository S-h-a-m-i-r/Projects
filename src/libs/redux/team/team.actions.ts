import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../http";
import { setError } from "../error/error.reducer";

const getTeamList = createAsyncThunk("get/team", async (_, thunkApi) => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "GET_ALL_PROJECTS",
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

export { getTeamList };
