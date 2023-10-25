import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import httpClient from "../../../http";
import store from "libs/redux";
import { INITIAL_STATE } from "./dashboard.state";
import { setError } from "libs/redux/error/error.reducer";
export type KPI_TYPE = "" | "Observatory" | "Measured" | "Feedback" | "Questionnaire";
export type KPI_SELECT_TYPE = {
	title: "Role" | "Team" | "Individual";
	value: number;
	name: string;
};
export const KPI_SELECT: KPI_SELECT_TYPE[] = [
	{
		title: "Role",
		value: 1,
		name: "Role",
	},
	{
		title: "Team",
		value: 2,
		name: "team",
	},
	{
		title: "Individual",
		value: 3,
		name: "individual",
	},
];
export type KPI_APPLICABLE_FOR = "Team" | "Ceo" | "Engineer" | "Manager";
export type QUESTIONAIRE = {
	statement: string;
	weightage: number;
};
export type KPI = {
	id?: number;
	kpi_name: string;
	assign_type_id: number;
	assign_type_name: string;
	selected_assign_id: number;
	selected_assign_name: string;
	kpi_type: KPI_TYPE;

	applicable_for: KPI_APPLICABLE_FOR[];
	statement?: string;
	statements?: Array<QUESTIONAIRE>;
	kpi_description: string;
	kpi_weight: number;
};

// Create new kip
const createKpi = createAsyncThunk("create/kpi", async (_, thunkAPI) => {
	try {
		const kpi: KPI = { ...store.getState().kpi.kpi };
		console.log("CHECK MEEE", kpi);
		if (!kpi.statements?.length && kpi.statement) {
			delete kpi.statements;
		}
		if (!kpi.statement && kpi.statements?.length) {
			delete kpi.statement;
		}

		const { response, error } = await httpClient({
			method: "POST",
			path: {
				url: "KPI",
			},
			data: kpi,
		});
		if (error) {
			// Show error alert
			store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkAPI.rejectWithValue(error.message);
		}
		if (response) {
			return response.data;
		}
		return { ...INITIAL_STATE.kpi };
	} catch (err) {
		const error = err as AxiosError;
		store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
	}
});

const getKpiById = createAsyncThunk("getKpiById", async (id: number, thunkAPI) => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "KPI_ID",
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
		return { ...INITIAL_STATE.kpi };
	} catch (err) {
		const error = err as AxiosError;

		return error.message;
	}
});

const updateKpi = createAsyncThunk("upadte/kpi", async (_, thunkAPI) => {
	try {
		const kpi: KPI = { ...store.getState().kpi.kpi };
		if (!kpi.statements?.length && kpi.statement) {
			delete kpi.statements;
		}
		if (!kpi.statement && kpi.statements?.length) {
			delete kpi.statement;
		}

		const { response, error } = await httpClient({
			method: "PUT",
			path: {
				url: "KPI_ID",
				params: {
					id: kpi.id,
				},
			},
			data: kpi,
		});
		if (error) {
			// Show error alert
			store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkAPI.rejectWithValue(error.message);
		}
		if (response) {
			return response.data;
		}
		return { ...INITIAL_STATE.kpi };
	} catch (err) {
		const error = err as AxiosError;
		store.dispatch(setError({ error: error.message, open: true, severity: "error" }));
	}
});

export { createKpi, getKpiById, updateKpi };
