import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../http";
import { setError } from "../error/error.reducer";
import { AxiosError } from "axios";

export type STATUS = {
	status: string;
};
export interface appraisal_flow {
	id: number;
	flow_name: string;
	created_by: number;
	is_active: boolean | null;
	team_id: number;
	appraisal_type: string;
	flow_steps: any[] | null;
}
export type APPRAISAL = {
	filter: any;

	map: any;
	id?: number;
	appraisal_name: string;
	appraisal_year: string;
	appraisal_type: string;
	supervisor_id: number;
	appraisal_flow_id: number;
	appraisal_flow: appraisal_flow;
	supervisor_name: string;
	status: boolean;
};

const getAppraisalList = createAsyncThunk("appraisal_list", async (_, thunkApi) => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "GET_APPRAISAL",
			},
		});

		if (error) {
			thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkApi.rejectWithValue("");
		}
		console.log("this is data" + response.data);

		return thunkApi.fulfillWithValue(response.data);
	} catch (error: any) {
		thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		return thunkApi.rejectWithValue("");
	}
});
const delAppraisalList = createAsyncThunk("del/appraisal", async (id: number) => {
	try {
		const { response, error } = await httpClient({
			method: "DELETE",
			path: {
				url: "DEL_APPRAISALS",
				params: {
					id,
				},
			},
		});

		if (error) {
			throw new Error(error.message);
		}

		return response.data;
	} catch (err) {
		const error = err as AxiosError;

		return error.message;
	}
});

export { getAppraisalList, delAppraisalList };
