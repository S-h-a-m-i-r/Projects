import { createSlice } from "@reduxjs/toolkit";
import initialState from "./employees.state";
import { getEmployeeList } from "./employees.actions";

const employeeSlice = createSlice({
	name: "employeesList",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getEmployeeList.pending, (state) => {
			state.loading = true;
			state.error = "";
			state.emplist.empdetails = [];
		});
		builder.addCase(getEmployeeList.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.error = "";
			state.emplist.empdetails = payload;
		});
		builder.addCase(getEmployeeList.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = `${payload}` || "error";
		});
	},
});

export default employeeSlice.reducer;
