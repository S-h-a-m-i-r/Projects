import { MenuItem, Stack, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "../ducks/appraisals.reducer";
import { getEmployeeDesignation } from "libs/redux/Role/employeeName.actions";
import { getEmployeeList } from "libs/redux/employees/employees.actions";
import { getTeamList } from "libs/redux/team/team.actions";
import Loading from "components/loading";
import Supervisor from "./Supervisor";

interface SelectTeamProps {
	initialValue?: number | string;
}

interface Designation {
	value: number | string;
	label: string;
}

const RoleTeam: React.FC<SelectTeamProps> = () => {
	const [selectedTeam, setSelectedTeam] = useState<any>(null);
	const [selectedIndividual, setSelectedIndividual] = useState<any>(null);
	const [selectedSupervisorId, setSelectedSupervisorId] = useState<number | undefined>(undefined);
	const { payload: appraisals } = useAppSelect((state) => state.appraisals);
	const { supervisor_id, selected_id } = useAppSelect((state) => state.appraisals.payload);
	const { nameList } = useAppSelect((state) => state.role);
	const { teams } = useAppSelect((state) => state.team);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getEmployeeList());
	}, [dispatch]);

	const [inputValue, setInputValue] = useState("");

	const handleNameChange = (e: SelectChangeEvent<any>) => {
		const newInputValue = e.target.value;
		setInputValue(newInputValue);

		const team = teams.projects.find((team) => team.projectDetails.projectId === Number(newInputValue));
		setSelectedTeam(team);

		const individual = teams.projects.find((team) => team?.AllocateTo?.employeeId === Number(newInputValue));
		setSelectedIndividual(individual);
		//////////////////// superviorName
		// const selectedName = team?.AllocateTo?.name ?? "";

		// const selectedTeamName = team?.projectDetails?.projectName ?? "";
		// const selectedRoleName = nameList?.designations.find((item) => item.value === Number(newInputValue))?.label ?? "";
		////////////////////// supervisorID
		const individualSupervisor = teams.projects.find((team) => team.AllocateTo?.employeeId === Number(newInputValue));

		const teamSupervisor = teams.projects.find((team) => team.projectDetails.projectId === Number(newInputValue));
		const individualSupervisorId = individual?.projectDetails?.supervisorId;

		const teamSupervisorId = team?.projectDetails?.supervisorId;

		const supervisorId = individualSupervisorId || teamSupervisorId || 180;

		const supervisorName =
			individualSupervisor?.projectDetails.employeeProjectSupervisor ||
			teamSupervisor?.projectDetails.employeeProjectSupervisor ||
			"";

		setSelectedSupervisorId(supervisorId);

		dispatch(
			setAppraisals({
				...appraisals,
				selected_id: Number(newInputValue) as number,
				// appraisal_for_name: selectedTeamName || selectedName || selectedRoleName || "",
				supervisor_id: supervisorId as number,
				supervisor_name: supervisorName,
			})
		);
	};

	useEffect(() => {
		if (appraisals.appraisal_for_id === 1) {
			const fetchDesignations = async () => {
				await dispatch(getEmployeeDesignation());
			};

			fetchDesignations();
		} else if (appraisals.appraisal_for_id === 2) {
			const fetchTeams = async () => {
				await dispatch(getTeamList());
			};

			fetchTeams();
		} else if (appraisals.appraisal_for_id === 3) {
			const fetchIndividuals = async () => {
				await dispatch(getTeamList());
			};

			fetchIndividuals();
		}
	}, [appraisals.appraisal_for_id, dispatch]);

	const handleSupervisorChange = (value: number) => {
		dispatch(
			setAppraisals({
				...appraisals,
				supervisor_id: value,
			})
		);
	};

	return (
		<>
			<Stack mt={10}>
				{appraisals.appraisal_for_id === 1 && (
					<Stack>
						<Typography>Selected Type</Typography>
						<Select
							size="small"
							value={selected_id.toString()}
							onChange={handleNameChange}
							fullWidth
							sx={{
								boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
								backgroundColor: "white",
								borderRadius: (theme) => theme.shape.borderRadius * 0.25,
							}}
						>
							{nameList.designations.length > 0 ? (
								nameList.designations.map((designation: Designation, index: number) => (
									<MenuItem key={index} value={designation.value}>
										{designation.label}
									</MenuItem>
								))
							) : (
								<Typography variant="body1">
									<Loading />
								</Typography>
							)}
						</Select>
					</Stack>
				)}
				{appraisals.appraisal_for_id === 2 && (
					<Stack>
						<Typography>Selected Type </Typography>
						<Select
							value={selected_id.toString()}
							onChange={handleNameChange}
							size="small"
							fullWidth
							sx={{
								boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
								marginTop: (theme) => theme.spacing(5),
								backgroundColor: "white",
								borderRadius: (theme) => theme.shape.borderRadius * 0.25,
							}}
						>
							{teams.projects.length > 0 ? (
								teams.projects.map((team) => (
									<MenuItem value={team?.projectDetails?.projectId}>{team?.projectDetails?.projectName}</MenuItem>
								))
							) : (
								<Typography variant="body1">
									<Loading />
								</Typography>
							)}
						</Select>
					</Stack>
				)}
				{appraisals.appraisal_for_id === 3 && (
					<Stack>
						<Typography>Selected Type</Typography>
						<Select
							size="small"
							fullWidth
							sx={{
								boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
								marginTop: (theme) => theme.spacing(5),
								backgroundColor: "white",
								borderRadius: (theme) => theme.shape.borderRadius * 0.25,
							}}
							value={selected_id.toString()}
							onChange={handleNameChange}
						>
							{teams.projects.length > 0 ? (
								teams.projects.map((team) => {
									return <MenuItem value={team?.AllocateTo?.employeeId}>{team?.AllocateTo?.name}</MenuItem>;
								})
							) : (
								<Typography variant="body1">
									<Loading />
								</Typography>
							)}
						</Select>
					</Stack>
				)}
			</Stack>
			<Supervisor
				selectedTeamId={inputValue}
				selectedIndividualId={inputValue}
				value={supervisor_id}
				onChange={handleSupervisorChange}
			/>
		</>
	);
};
export default RoleTeam;
