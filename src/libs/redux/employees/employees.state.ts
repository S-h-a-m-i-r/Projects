export type Employee = {
	employeeId: number;
	name: string;
	address: string;
};
export type Emp = {
	empdetails: Array<Employee>;
};
export type INITIAL_STATE = {
	loading: boolean;
	error: string;
	emplist: Emp;
};

const initialState: INITIAL_STATE = {
	loading: false,
	error: "",
	emplist: {
		empdetails: [],
	},
};

export default initialState;
