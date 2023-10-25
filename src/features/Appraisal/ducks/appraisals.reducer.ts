import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./appraisals.state";
import { APPRAISALS, getAppraisalsById, updateAppraisals } from "./appraisals.actions";
import { getAppraisalList } from "libs/redux/appraisals/appraisal.action";
import { createAppraisalList } from "./appraisals.actions";

const appraisal_list = createSlice({
	name: "appraisal",
	initialState: INITIAL_STATE,
	reducers: {
		setAppraisals: (state, { payload }: PayloadAction<APPRAISALS>) => {
			state.payload = payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(getAppraisalList.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(getAppraisalList.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.appraisals = payload;
		});
		builder.addCase(getAppraisalList.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload?.error || "";
		});
		builder.addCase(createAppraisalList.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(createAppraisalList.fulfilled, (state, { payload }: PayloadAction<APPRAISALS>) => {
			state.loading = false;
			state.payload = payload;
		});
		builder.addCase(createAppraisalList.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload?.error || "";
		});
		//delete
		// builder.addCase(delAppraisals.pending, (state) => {
		// 	state.loading = true;
		// 	state.error = "";
		// });
		// builder.addCase(delAppraisals.fulfilled, (state, { payload }: PayloadAction<APPRAISALS>) => {
		// 	state.loading = false;
		// 	state.payload = payload;
		// });
		// builder.addCase(delAppraisals.rejected, (state, { payload }: any) => {
		// 	state.loading = false;
		// 	state.error = payload?.error || "";
		// });
		//update
		builder.addCase(updateAppraisals.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(updateAppraisals.fulfilled, (state, { payload }: PayloadAction<APPRAISALS>) => {
			state.loading = false;
			state.payload = payload;
		});
		builder.addCase(updateAppraisals.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload?.error || "";
		});
		// //get

		builder.addCase(getAppraisalsById.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getAppraisalsById.fulfilled, (state, { payload }: any) => {
			state.loading = false;
			state.payload = payload;
		});
		builder.addCase(getAppraisalsById.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload || "";
			state.payload = { ...INITIAL_STATE.payload };
		});
	},
});

export const { setAppraisals } = appraisal_list.actions;
export default appraisal_list.reducer;
