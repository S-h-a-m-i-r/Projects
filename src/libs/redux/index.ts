import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import userReducer from "features/Login/ducks/login.reducer";
import kpiReducer from "features/Dashboard/ducks/dashboard.reducer";
import getKpiReducer from "features/KpiList/ducks/kpilist.reducer";
import errorReducer from "./error/error.reducer";
import appraisalFlowReducer from "features/AppraisalFlow/ducks/appraisalFlow.reducer";
import appraisalsReducer from "features/Appraisal/ducks/appraisals.reducer";
import employeesReducer from "./employees/employees.reducer";
import roleReducer from "./Role/employeeName.reducer";
import teamReducer from "./team/team.reducer";
import appraisalReducer from "./appraisals/appraisal.reducer";
import todoReducer from "../../features/ToDo/ducks/todo.reducer";

const logger = createLogger({
	// ADD Additional config
});

const store = configureStore({
	reducer: {
		user: userReducer,
		kpi: kpiReducer,
		kpiList: getKpiReducer,
		error: errorReducer,
		appraisalFlow: appraisalFlowReducer,
		appraisals: appraisalsReducer,
		employeesList: employeesReducer,
		role: roleReducer,
		team: teamReducer,
		appraisalList: appraisalReducer,
		todo:todoReducer,
		
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(logger);
	},
	devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
