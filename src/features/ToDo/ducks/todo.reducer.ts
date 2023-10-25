import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./todo.state";
import { TODO, createScore, getTodoById } from "./todo.actions";
import { getTodo } from "./todo.actions";

const appraisal_list = createSlice({
	name: "todo",
	initialState: INITIAL_STATE,
	reducers: {
		gettodo: (state, { payload }: PayloadAction<TODO[]>) => {
			state.getkpi.payload = payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(getTodo.pending, (state) => {
			state.getkpi.loading = true;
			state.getkpi.error = "";
		});
		builder.addCase(getTodo.fulfilled, (state, { payload }: PayloadAction<TODO[]>) => {
			state.getkpi.loading = false;
			state.getkpi.payload = payload;
		});
		builder.addCase(getTodo.rejected, (state, { payload }: any) => {
			state.getkpi.loading = false;
			state.getkpi.error = payload?.error || "";
		});
		//GET_APPRAISALKPIS_BY_EMPID
		builder.addCase(getTodoById.pending, (state) => {
			state.getAppraisalKpi.loading = true;
		});
		builder.addCase(getTodoById.fulfilled, (state, { payload }: any) => {
			state.getAppraisalKpi.loading = false;
			state.getAppraisalKpi.payload = payload;
		});
		builder.addCase(getTodoById.rejected, (state, { payload }: any) => {
			state.getAppraisalKpi.loading = false;
			state.getAppraisalKpi.error = payload || "";
			state.getAppraisalKpi.payload = { ...INITIAL_STATE.getAppraisalKpi.payload };
		});
		//CREATE_SCORE
		builder.addCase(createScore.pending, (state) => {
			state.createScore.loading = true;
		});
		builder.addCase(createScore.fulfilled, (state, { payload }: any) => {
			state.createScore.loading = false;
			state.createScore.payload = payload;
		});
		builder.addCase(createScore.rejected, (state, { payload }: any) => {
			state.createScore.loading = false;
			state.createScore.error = payload || "";
			state.createScore.payload = { ...INITIAL_STATE.createScore.payload };
		});
	},
});

export const { gettodo } = appraisal_list.actions;
export default appraisal_list.reducer;
