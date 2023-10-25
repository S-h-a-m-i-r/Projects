import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./appraisal.states";
import { APPRAISAL, delAppraisalList } from "./appraisal.action";
import { getAppraisalList } from "./appraisal.action";

const appraisal_list = createSlice({
	name: "appraisal",
	initialState: INITIAL_STATE,
	reducers: {
		getAppraisal: (state, { payload }: PayloadAction<APPRAISAL>) => {
			state.payload = payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(getAppraisalList.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(
			getAppraisalList.fulfilled,
			(state, { payload }: PayloadAction<APPRAISAL>) => {
				state.loading = false;
				state.payload = payload;
			}
		);
		builder.addCase(getAppraisalList.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload?.error || "";
		});
		builder.addCase(delAppraisalList.pending, (state) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(delAppraisalList.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.payload = payload;
		});
		builder.addCase(delAppraisalList.rejected, (state, { payload }: any) => {
			state.loading = false;
			state.error = payload?.error || "";
		});
	},
});

export const { getAppraisal } = appraisal_list.actions;
export default appraisal_list.reducer;
