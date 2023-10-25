import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./login.state";
import { loginUser } from "./login.action";

const user = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(loginUser.fulfilled, (state, { payload }: PayloadAction) => {
			state.loading = false;
			state.error = "";
			state.user = payload;
		});
		builder.addCase(loginUser.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = payload?.toString() || "";
			state.user = {};
		});
	},
});

export default user.reducer;
