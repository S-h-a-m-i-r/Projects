export type Employee_Desig = {
	value: number;
	label: string;
};
export type Employee_NameList = {
	designations: Array<Employee_Desig>;
};

type INITIAL_STATE = {
	loading: boolean;
	error: string;
	nameList: Employee_NameList;
};

const initialState: INITIAL_STATE = {
	loading: false,
	error: "",
	nameList: {
		designations: [],
	},
};

export default initialState;
