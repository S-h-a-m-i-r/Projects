export type ERROR_SEVERITY = "error" | "warning" | "info" | "success";

export type INITIAL_STATE_TYPE = {
	error: string;
	severity: ERROR_SEVERITY;
	open: boolean;
};

export const initialState: INITIAL_STATE_TYPE = {
	error: "",
	severity: "info",
	open: false,
};
