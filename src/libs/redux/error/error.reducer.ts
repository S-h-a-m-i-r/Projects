import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_STATE_TYPE, initialState } from "./error.state";

const errorSlice = createSlice({
	name: "errorSlice",
	initialState,
	reducers: {
		setError: (state, { payload }: PayloadAction<INITIAL_STATE_TYPE>) => {
			state.open = payload.open;
			state.error = payload.error;
			state.severity = payload.severity;
		},
	},
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
