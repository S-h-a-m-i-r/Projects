import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./appraisalFlow.state";
import { APPRAISALFLOW, addAppraisal, delAppraisal, getAppraisalById, updateAppraisal } from "./appraisalFlow.actions";
import { getAppraisal } from "./appraisalFlow.actions";

const appraisaFlow = createSlice({
	name: "appraisaFlow",
	initialState: INITIAL_STATE,
	reducers: {
		setAppraisal: (state, { payload }: PayloadAction<APPRAISALFLOW>) => {
			state.payload = payload;
		},
	},
	extraReducers(builder) {
		// Add Appraisal
		builder.addCase(addAppraisal.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(addAppraisal.fulfilled, (state, { payload }: PayloadAction<APPRAISALFLOW>) => {
			state.loading = false;
			state.payload = payload;
		});
		builder.addCase(addAppraisal.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload?.error || "";
		});
		// Update Appraisal
		builder.addCase(updateAppraisal.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(updateAppraisal.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.payload = payload;
		});
		builder.addCase(updateAppraisal.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload || "";
			state.payload = { ...INITIAL_STATE.payload };
		});
		//Get Appraisal
		builder.addCase(getAppraisal.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getAppraisal.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.appraisalflow = payload;
		});

		builder.addCase(getAppraisal.rejected, (state, { payload }: any) => {
			state.loading = false;
		});
		//Delete Appraisal
		builder.addCase(delAppraisal.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(delAppraisal.fulfilled, (state, { payload }) => {
			state.loading = false;

			state.appraisalflow = payload;
		});

		builder.addCase(delAppraisal.rejected, (state, { payload }: any) => {
			state.loading = false;
		});
		// Get Appraisal By Id
		builder.addCase(getAppraisalById.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getAppraisalById.fulfilled, (state, { payload }: any) => {
			state.loading = false;
			state.payload = payload;
		});
		builder.addCase(getAppraisalById.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload || "";
			state.payload = { ...INITIAL_STATE.payload };
		});
	},
});

export const { setAppraisal } = appraisaFlow.actions;
export default appraisaFlow.reducer;
