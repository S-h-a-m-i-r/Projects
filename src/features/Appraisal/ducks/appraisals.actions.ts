import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import httpClient from "../../../http";
import store from "libs/redux";
import { INITIAL_STATE } from "./appraisals.state";
import { setError } from "libs/redux/error/error.reducer";
import { KPI } from "features/Dashboard/ducks/dashboard.actions";

export type APPRAISAL_TYPE = {
	title: "Mid-Year" | "Yearly";
	value: string;
};
export type APPRAISAL_SELECT_TYPE = {
	title: "Role" | "Team" | "Individual";
	value: number;
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const APPRAISAL_TYPE: APPRAISAL_TYPE[] = [
	{
		title: "Mid-Year",
		value: "Mid-Year",
	},
	{
		title: "Yearly",
		value: "Annual",
	},
];

export type APPRAISAL_KPIS = {
	kpi_name: string;
	id: number;
	employee_id: number;
	kpi_id: number;
	status: string;
	kpis: KPI;
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
export type APPRAISALS = {
	filter: any;
	id: number;
	appraisal_name: string;
	appraisal_year: number;
	appraisal_for_id: number;
	selected_id: number;
	appraisal_flow_id: number;
	supervisor_id: number;
	supervisor_name: string;
	appraisal_type: string;
	status: boolean;
};

const createAppraisalList = createAsyncThunk("create/appraisals", async () => {
	try {
		const appraisals: APPRAISALS = { ...store.getState().appraisals.payload };

		const { response, error } = await httpClient({
			method: "POST",
			path: {
				url: "APPRAISALS",
			},
			data: appraisals,
		});

		if (error) {
			store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		}

		if (response) {
			return response.data;
		}
		return { ...INITIAL_STATE.appraisals };
	} catch (err) {
		const error = err as AxiosError;

		store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
	}
});

//get list of aappraisal

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

		return thunkApi.fulfillWithValue(response.data);
	} catch (error: any) {
		thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		return thunkApi.rejectWithValue("");
	}
});

const getAppraisalsById = createAsyncThunk("getAppraisalsById", async (id: number, thunkAPI) => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "APPRAISALS_BY_ID",
				params: {
					id,
				},
			},
		});

		if (error) {
			store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkAPI.rejectWithValue(error.message);
		}

		if (response) {
			return response.data.appraisal;
		}
		return { ...INITIAL_STATE.appraisals };
	} catch (err) {
		const error = err as AxiosError;

		return error.message;
	}
});

const updateAppraisals = createAsyncThunk("upadte/kpi", async (_, thunkAPI) => {
	try {
		const appraisals: APPRAISALS = { ...store.getState().appraisals.payload };

		const { response, error } = await httpClient({
			method: "PUT",
			path: {
				url: "APPRAISALS_BY_ID",
				params: {
					id: appraisals.id,
				},
			},
			data: appraisals,
		});
		if (error) {
			// Show error alert
			store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkAPI.rejectWithValue(error.message);
		}
		if (response) {
			return response.data;
		}
		return { ...INITIAL_STATE.appraisals };
	} catch (err) {
		const error = err as AxiosError;
		store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
	}
});

export { createAppraisalList, getAppraisalList, updateAppraisals, getAppraisalsById };
