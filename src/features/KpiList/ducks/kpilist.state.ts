import { KPI } from "./kpilist.actions";

export type InitialState = {
	loading: boolean;
	error: string;
	kpi: KPI;
	data: KPI[];
};

export const INITIAL_STATE: InitialState = {
	data: [],
	loading: false,
	error: "",
	kpi: {
		kpi_name: "",
		assign_type_id: 1,
		assign_type_name: "",
		selected_assign_id: 180,
		selected_assign_name: "",
		applicable_for: [],
		kpi_type: "",
		statement: "",
		statements: [
			{
				statement: "",
				weightage: 0,
			},
		],
		kpi_description: "",
		kpi_weight: 0,
	},
};
