import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./kpilist.state";
import { delKpi, getKpi } from "./kpilist.actions";

const user = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getKpi.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getKpi.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.data = payload;
		});
		builder.addCase(getKpi.rejected, (state, { payload }: any) => {
			state.loading = false;
		});
		builder.addCase(delKpi.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(delKpi.fulfilled, (state, { payload }) => {
			state.loading = false;

			state.data = payload;
		});

		builder.addCase(delKpi.rejected, (state, { payload }: any) => {
			state.loading = false;
		});
	},
});

export default user.reducer;
