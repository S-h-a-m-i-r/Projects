import { createSlice } from "@reduxjs/toolkit";
import initialState from "./team.state";
import { getTeamList } from "./team.actions";

const teamSlice = createSlice({
	name: "teamlist",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getTeamList.pending, (state) => {
			state.loading = true;
			state.error = "";
			state.teams.projects = [];
		});
		builder.addCase(getTeamList.fulfilled, (state, { payload }) => {
			state.loading = false;
			state.error = "";
			state.teams = payload;
		});
		builder.addCase(getTeamList.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = `${payload}` || "error";
		});
	},
});

export default teamSlice.reducer;
