import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./dashboard.state";
import { KPI, createKpi, getKpiById, updateKpi } from "./dashboard.actions";

const kpi = createSlice({
	name: "kpi",
	initialState: INITIAL_STATE,
	reducers: {
		setKpi: (state, { payload }: PayloadAction<KPI>) => {
			state.kpi = payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(createKpi.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(createKpi.fulfilled, (state, { payload }: PayloadAction<KPI>) => {
			state.loading = false;
			state.kpi = payload;
		});
		builder.addCase(createKpi.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload || "";
			state.kpi = { ...INITIAL_STATE.kpi };
		});

		// Get KPI by ID
		builder.addCase(getKpiById.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getKpiById.fulfilled, (state, { payload }: any) => {
			state.loading = false;
			state.kpi = payload;
		});
		builder.addCase(getKpiById.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload || "";
			state.kpi = { ...INITIAL_STATE.kpi };
		});

		// Update kpi
		builder.addCase(updateKpi.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(updateKpi.fulfilled, (state, { payload }: PayloadAction<KPI>) => {
			state.loading = false;
			state.kpi = payload;
		});
		builder.addCase(updateKpi.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload || "";
			state.kpi = { ...INITIAL_STATE.kpi };
		});
	},
});

export const { setKpi } = kpi.actions;
export default kpi.reducer;
