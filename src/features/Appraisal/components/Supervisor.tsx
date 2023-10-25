import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "../ducks/appraisals.reducer";

interface SupervisorProps {
	initialValue?: number | string;
	selectedTeamId?: number | string;
	selectedIndividualId?: number | string;
	onChange?: (value: number) => void;
	value?: number | string;
}

const Supervisor: React.FC<SupervisorProps> = ({
	initialValue,
	selectedTeamId,
	selectedIndividualId,
	onChange,
	value,
}) => {
	const dispatch = useAppDispatch();
	const { payload: appraisals } = useAppSelect((state) => state.appraisals);
	const { teams } = useAppSelect((state) => state.team);

	const selectedTeam = teams.projects.find((team) => team?.projectDetails?.projectId === selectedTeamId);
	const selectedIndividual = teams.projects.find((team) => team?.AllocateTo?.employeeId === selectedIndividualId);

	const supervisor_name = selectedTeam
		? selectedTeam.projectDetails.employeeProjectSupervisor
		: selectedIndividual
		? selectedIndividual.projectDetails.employeeProjectSupervisor
		: "";

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedValue = Number(event.target.value);
		onChange?.(selectedValue);

		dispatch(
			setAppraisals({
				...appraisals,
				supervisor_id: selectedValue,
			})
		);
	};

	return (
		<>
			<Typography
				sx={{
					textAlign: "center",
				}}
			>
				<Typography>supervisor</Typography>
				{supervisor_name}
			</Typography>
			{onChange && <input type="number" value={value} onChange={handleChange} style={{ display: "none" }} />}
		</>
	);
};

export default Supervisor;
