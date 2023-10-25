import { APPRAISALFLOW } from "./appraisalFlow.actions";

export type InitialState = {
	loading: boolean;
	error: string;
	appraisalflow: APPRAISALFLOW[];
	map?: [];
	payload: APPRAISALFLOW;
};

export const INITIAL_STATE: InitialState = {
	loading: false,
	error: "",
	appraisalflow: [],
	payload: {
		flow_name: "",
		assign_type_id: 0,
		assign_type_name: "",
		selected_assign_id: 0,
		selected_assign_name: "",
		created_by: 1,
		is_active: true,
		appraisal_type: "",
		flow_steps: [],
		map: {},
	},
};
