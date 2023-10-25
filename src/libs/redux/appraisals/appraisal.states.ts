import { APPRAISAL } from "./appraisal.action";
export type InitialState = {
	loading: boolean;
	error: string;
	appraisal: APPRAISAL[];
	map?: [];
	filtrr?: [];
	payload: APPRAISAL;
};
export const INITIAL_STATE: InitialState = {
	loading: false,
	error: "",
	appraisal: [],
	payload: {
		map: {},
		appraisal_name: "",
		appraisal_year: "",
		appraisal_type: "",
		supervisor_id: 0,
		appraisal_flow_id: 0,

		status: false,
		supervisor_name: "",
		appraisal_flow: {
			id: 0,
			flow_name: "",
			created_by: 0,
			is_active: null,
			team_id: 0,
			appraisal_type: "",
			flow_steps: null,
		},
		filter: {},
	},
};
