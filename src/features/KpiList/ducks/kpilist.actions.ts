import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import httpClient from "../../../http";

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

const getKpi = createAsyncThunk("get/kpi", async () => {
	try {
		const { response, error } = await httpClient({
			method: "GET",
			path: {
				url: "KPI",
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

const delKpi = createAsyncThunk("del/kpi", async (id: number) => {
	try {
		const { response, error } = await httpClient({
			method: "DELETE",
			path: {
				url: "DEL_KPI",
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

export { getKpi, delKpi };
