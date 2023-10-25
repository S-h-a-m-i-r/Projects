import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import httpClient from "../../../http";
import store from "libs/redux";
import { INITIAL_STATE } from "./appraisalFlow.state";
import { setError } from "libs/redux/error/error.reducer";
import { checkSession } from "libs/session";

export type APPRAISAL_SELECT_TYPE = {
	title: "Role" | "Team" | "Individual";
	value: number;
};
export type APPRAISALTYPE_SELECT_TYPE = {
	title: "Mid-Year" | "Full-Year";
	value: string;
};
export const APPRAISAL_SELECT: APPRAISAL_SELECT_TYPE[] = [
	{
		title: "Role",
		value: 1,
	},
	{
		title: "Team",
		value: 2,
	},
	{
		title: "Individual",
		value: 3,
	},
];
export const APPRAISALTYPE_SELECT: APPRAISALTYPE_SELECT_TYPE[] = [
	{
		title: "Mid-Year",
		value: "Mid-Year",
	},
	{
		title: "Full-Year",
		value: "Annual",
	},
];

export type STEP = {
	[key: string]: string | number;

	step_name: string;
	step_order: number;
	user_id: number;
};

export const INITIAL_VALUE: STEP = {
	step_name: "",
	step_order: 0,
	user_id: 19,
};

export type APPRAISALFLOW = {
	map: any;
	id?: number;
	flow_name: string;
	assign_type_id: number;
	assign_type_name: string;
	selected_assign_id: number;
	selected_assign_name: string;
	created_by: number;
	is_active: boolean;
	appraisal_type: string;
	flow_steps: Array<STEP>;
};

const addAppraisal = createAsyncThunk("appraisal/addAppraisal", async () => {
	try {
		const appraisalflow: APPRAISALFLOW = { ...store.getState().appraisalFlow.payload };

		const { response, error } = await httpClient({
			method: "POST",
			path: {
				url: "APPRAISAL_FLOW",
			},
			data: {
				...appraisalflow,
				is_active: true,
				created_by: parseInt(checkSession()?.dataValues?.id),
			},
		});

		if (error) {
			store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		}

		if (response) {
			return response.data;
		}
		return { ...INITIAL_STATE.appraisalflow };
	} catch (err) {
		const error = err as AxiosError;

		store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
	}
});

// Get APPRAISAL Flow FROM LIST by id.
const getAppraisalById = createAsyncThunk("getAppraisalById", async (id: number, thunkAPI) => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "APPRAISAL_FLOW_ID",
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
			return response.data;
		}
		return { ...INITIAL_STATE.appraisalflow };
	} catch (err) {
		const error = err as AxiosError;

		return error.message;
	}
});

const getAppraisal = createAsyncThunk("get/Appraisal", async () => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "APPRAISAL_FLOW",
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

// DELETEING APPRAISAL FROM LIST.

const delAppraisal = createAsyncThunk("del/Appraisal", async (id: number) => {
	try {
		const { response, error } = await httpClient({
			method: "DELETE",
			path: {
				url: "DEL_APPRAISAL",
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

//updating the appraisal

const updateAppraisal = createAsyncThunk("appraisal/updateAppraisal", async (_, thunkAPI) => {
	try {
		const appraisalflow: APPRAISALFLOW = { ...store.getState().appraisalFlow.payload };

		const { response, error } = await httpClient({
			method: "PUT",
			path: {
				url: "APPRAISAL_FLOW_ID",
				params: {
					id: appraisalflow.id,
				},
			},
			data: appraisalflow,
		});

		if (error) {
			store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		}

		if (response) {
			return response.data;
		}
		return { ...INITIAL_STATE.appraisalflow };
	} catch (err) {
		const error = err as AxiosError;

		store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
	}
});

export { addAppraisal, getAppraisal, delAppraisal, updateAppraisal, getAppraisalById };
