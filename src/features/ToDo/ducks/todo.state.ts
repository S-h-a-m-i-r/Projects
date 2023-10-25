import { TODO, APPRAISAL, SCORE } from "./todo.actions";

export type InitialState = {
	getkpi: {
		loading: boolean;
		error: string;
		todo: TODO[];
		data: TODO[];
		payload: TODO[];
	};
	getAppraisalKpi: {
		loading: boolean;
		error: string;
		appraisal: APPRAISAL[];
		data: APPRAISAL[];
		payload: APPRAISAL[];
	};
	createScore: {
		loading: boolean;
		error: string;
		score: SCORE[];
		data: SCORE[];
		payload: SCORE[];
	};
};

export const INITIAL_STATE: InitialState = {
	getkpi: {
		loading: false,
		error: "",
		todo: [],
		data: [],
		payload: [],
	},
	getAppraisalKpi: {
		loading: false,
		error: "",
		appraisal: [],
		data: [],
		payload: [],
	},
	createScore: {
		loading: false,
		error: "",
		score: [],
		data: [],
		payload: [],
	},
};
