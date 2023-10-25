export type ProjectDetails = {
	projectDetails: any;
	projectName: string;
	projectId: number;
	employeeProjectSupervisor: string;
	supervisorId: number;
};

export type AllocateTo = {
	employeeId: number;
	name: string;
};

export type teamsData = {
	AllocateTo: AllocateTo;
	projectDetails: ProjectDetails;
};

export type Projects = {
	projects: Array<teamsData>;
};
type InitialState = {
	loading: boolean;
	error: string;
	teams: Projects;
};
const initialState: InitialState = {
	loading: false,
	error: "",
	teams: {
		projects: [],
	},
};

export default initialState;
