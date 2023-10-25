/* eslint-disable @typescript-eslint/no-unused-vars */
import { MenuItem, Stack, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { getEmployeeDesignation } from "libs/redux/Role/employeeName.actions";
import { getEmployeeList } from "libs/redux/employees/employees.actions";
import { getTeamList } from "libs/redux/team/team.actions";
import Loading from "components/loading";
import { INDIVIDUALS, ROLES, TEAMS } from "../../../utils/TeamType/selectType";
import { Employee } from "libs/redux/employees/employees.state";
import { setKpi } from "../ducks/dashboard.reducer";

interface SelectTeamProps {
	initialValue?: number;
}

interface Designation {
	value: number;
	label: string;
}

const RoleTeam: React.FC<SelectTeamProps> = ({ initialValue }) => {
	const [selectedTeam, setSelectedTeam] = useState<any>(null);
	const { kpi } = useAppSelect((state) => state.kpi);
	const { selected_assign_id } = kpi || { selected_assign_id: "" };

	const { nameList } = useAppSelect((state) => state.role);
	const { teams } = useAppSelect((state) => state.team);
	const { emplist } = useAppSelect((state) => state.employeesList);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getEmployeeList());
	}, [dispatch]);

	const [selectedValue, setSelectedValue] = useState(initialValue !== undefined ? initialValue : selected_assign_id);
	const [teamText, setTeamText] = useState<string>("");
	const [individualList, setIndividualList] = useState<any>([]);

	const [selectedRoleLabel, setSelectedRoleLabel] = useState<string>("");

	const onChange = (e: SelectChangeEvent<any>) => {
		const newSelectedValue = e.target.value;
		setSelectedValue(newSelectedValue);

		const team = teams.projects.find((team) => team.projectDetails.projectId === Number(newSelectedValue));
		setSelectedTeam(team);
		const individual = emplist.empdetails.find((item) => item.employeeId === Number(newSelectedValue));
		setIndividualList(individual ? [individual] : []);

		const selectedName = individual?.name ?? "";
		const selectedTeamName = team?.projectDetails.projectName ?? "";
		const selectedRoleName =
			nameList?.designations.find((item) => item.value === Number(newSelectedValue))?.label ?? "";
		dispatch(
			setKpi({
				...kpi,
				selected_assign_id: Number(newSelectedValue) as number,
				selected_assign_name: selectedTeamName || selectedName || selectedRoleName || "",
			})
		);

		// Update the teamText based on the selected value
		if (newSelectedValue === ROLES) {
			setTeamText("Role");
		} else if (newSelectedValue === TEAMS) {
			setTeamText("Team");
		} else if (newSelectedValue === INDIVIDUALS) {
			setTeamText("Individual");
		}
	};

	useEffect(() => {
		if (kpi.assign_type_name === ROLES) {
			const fetchDesignations = async () => {
				await dispatch(getEmployeeDesignation());
			};

			fetchDesignations();
		} else if (kpi.assign_type_name === TEAMS) {
			const fetchTeams = async () => {
				await dispatch(getTeamList());
			};

			fetchTeams();
		} else if (kpi.assign_type_name === INDIVIDUALS) {
			const fetchIndividuals = async () => {
				await dispatch(getEmployeeList());
			};

			fetchIndividuals();
		}
	}, [kpi.assign_type_name, dispatch]);

	useEffect(() => {
		if (kpi.assign_type_name === ROLES && nameList.designations.length > 0) {
			const selectedRole = nameList.designations.find(
				(designation: Designation) => designation.value === selectedValue
			);

			if (selectedRole) {
				setSelectedRoleLabel(selectedRole.label);
			}
		} else if (kpi.assign_type_name === TEAMS && teams.projects) {
			const selectedTeam = teams.projects.find((team: any) => team.projectDetails.projectId === Number(selectedValue));

			if (selectedTeam) {
				setSelectedRoleLabel(selectedTeam.projectDetails.projectName);
			}
		}
	}, [nameList.designations, teams.projects, selectedValue, kpi.assign_type_name]);

	return (
		<>
			<Stack mt={10}>
				{kpi.assign_type_name === ROLES && (
					<Stack>
						<Typography>Select</Typography>
						<Select
							size="small"
							fullWidth
							sx={{
								boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
								backgroundColor: "white",
								borderRadius: (theme) => theme.shape.borderRadius * 0.25,
							}}
							onChange={onChange}
							value={selectedValue}
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
				{kpi.assign_type_name === TEAMS && teams && (
					<Stack>
						<Typography>Select</Typography>
						<Select
							size="small"
							fullWidth
							sx={{
								boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
								backgroundColor: "white",
								borderRadius: (theme) => theme.shape.borderRadius * 0.25,
							}}
							onChange={onChange}
							value={selectedValue}
						>
							{teams.projects &&
								teams.projects.map((team: any, index: number) => (
									<MenuItem key={index} value={team.projectDetails.projectId}>
										{team.projectDetails.projectName}
									</MenuItem>
								))}
						</Select>
					</Stack>
				)}
				{kpi.assign_type_name === INDIVIDUALS && emplist.empdetails && (
					<Stack>
						<Typography>Select</Typography>
						<Select
							size="small"
							fullWidth
							sx={{
								boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
								backgroundColor: "white",
								borderRadius: (theme) => theme.shape.borderRadius * 0.25,
							}}
							onChange={onChange}
							value={selectedValue}
						>
							{emplist.empdetails.map((employee: Employee) => (
								<MenuItem key={employee.employeeId} value={employee.employeeId}>
									{employee.name}
								</MenuItem>
							))}
						</Select>
					</Stack>
				)}
			</Stack>
		</>
	);
};

export default RoleTeam;
