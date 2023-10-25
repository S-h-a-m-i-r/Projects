export type InitialState = {
	loading: boolean;
	error: string;
	user: any;
};

export const INITIAL_STATE: InitialState = {
	loading: false,
	error: "",
	user: {
		email: "",
	},
};
