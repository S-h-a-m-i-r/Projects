import { APPRAISALS } from "./appraisals.actions";

export type InitialState = {
	loading: boolean;
	error: string;
	appraisals: APPRAISALS[];
	payload: APPRAISALS;
	data: APPRAISALS[];
};

export const INITIAL_STATE: InitialState = {
	loading: false,
	error: "",
	appraisals: [],
	data: [],
	payload: {
		filter: {},
		id: 0,
		appraisal_name: "",
		appraisal_year: 0,
		appraisal_type: "",
		supervisor_id: 0,
		supervisor_name: "",
		appraisal_flow_id: 0,
		selected_id: 0,
		appraisal_for_id: 0,
		status: false,
	},
};
