import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../http";
import { setError } from "libs/redux/error/error.reducer";

export type KPIS = {
	id?: number;
	employee_id: number;
	kpi_id: number;
	status: string;
	kpi_type: string;
	kpi_weight: number;
	// applicable_for: [
	//                     "Engineer",
	//                     "Manager"
	//                 ],
	// statements: [
	// 	{
	// 		id: number;
	// 		statement: string;
	// 		weightage: number;
	// 	}

	// ];
};

export type employee_Data = {
	id?: number;
	emp_id: number;
	employee_name: string;
	designation_id: number;
	designation_name: string;
	appraisal_status: string;
	employee_image: string;
};

export type appraial_kpis = {
	kpis: KPIS;
};
export type TODO = {
	id?: number;
	appraisal_name: string;
	appraisal_year: string;
	appraisal_type: string;
	supervisor_id: number;
	appraisal_flow_id: number;
	team_id: number;
	appraisal_for: number;
	appraisal_for_name: string;
	appraisal_for_id: number;
	status: boolean;
	APPRAISAL_KPIS: Array<appraial_kpis>;
	employee_data: Array<employee_Data>;
};
export type SCORE = {
	// appraisal_kpi_id: number;
	evaluator_id: number;
	score: number;
	text_answer: string;
};

export type APPRAISAL = {
	appraisal_id: number;
	employee_id: number;
	kpi_id: number;
	status: string;
	kpi: {
		id: number;
		kpi_name: string;
		kpi_description: string;
		assign_type_id: number;
		assign_type_name: string;
		selected_assign_id: number;
		selected_assign_name: string;
		kpi_type: string;
		kpi_weight: number;
		applicable_for: ["Engineer", "Manager"];
		statements: Array<{
			id: number;
			statement: string;
			weightage: number;
		}>;
		statement: string;
	};
};
//Get todo
const getTodo = createAsyncThunk("getTodo", async (_, thunkApi) => {
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
//Create Score
const createScore = createAsyncThunk("createScore", async (_, thunkApi) => {
	try {
		const { response, error } = await httpClient({
			method: "POST",
			path: {
				url: "SCORE",
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
//get todo by id
const getTodoById = createAsyncThunk("getTodoById", async (id: string, thunkApi) => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "GET_APPRAISALKPIS_BY_EMPID",
				params: {
					id: `${id}`,
				},
			},
		});
		if (error) {
			thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
			return thunkApi.rejectWithValue("");
		}

		return thunkApi.fulfillWithValue(response?.data);
	} catch (error: any) {
		thunkApi.dispatch(setError({ error: error.message, open: true, severity: "error" }));
		return thunkApi.rejectWithValue("");
	}
});

export { getTodo, getTodoById, createScore };
