import { createSlice } from "@reduxjs/toolkit";
import initialState from "./employeeName";
import { getEmployeeDesignation } from "./employeeName.actions";

const roleSlice = createSlice({
	name: "employeesList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getEmployeeDesignation.pending, (state) => {
			state.loading = true;
			state.error = "";
			state.nameList.designations = [];
		});
		builder.addCase(getEmployeeDesignation.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.error = "";
			state.nameList = payload;
		});
		builder.addCase(getEmployeeDesignation.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = `${payload}` || "error";
		});
	},
});

export default roleSlice.reducer;
