import React from "react";
import { Box, Stack, Button } from "@mui/material";
import FormTitle from "./FormTitle";
import AppraisalYear from "./AppraisalYear";
import AppraisalType from "./AppraisalType";

import Team from "./Team";
import AppraisalKpi from "./AppraissalKpi";
import AppraisalName from "./AppraisalName";
import AppraisalflowId from "./AppraisalflowId";

import { useAppDispatch, useAppSelect } from "hooks/reduxHook";

import { updateAppraisals } from "../ducks/appraisals.actions";

import { createAppraisalList } from "../ducks/appraisals.actions";
import { useNavigate } from "react-router-dom";
import RoleTeam from "./roleTeam";

import Loading from "components/loading";
import checkIfObjectKeyIsEmpty from "utils/checkIfObjectKeyIsEmpty";
import EmpList from "./EmpList";

type FormProps = {
	updating?: boolean;
};

const Form: React.FC<FormProps> = (props) => {
	const { appraisalflow } = useAppSelect((state) => state.appraisalFlow);
	const { data } = useAppSelect((state) => state.kpiList);
	const dispatch = useAppDispatch();
	const { appraisals, error, loading } = useAppSelect((state) => state.appraisals);
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (props.updating) {
			await dispatch(updateAppraisals());
		} else {
			await dispatch(createAppraisalList());
		}

		if (error && !loading) {
			return;
		}

		return navigate("/appraisal", { replace: true });
	};

	const disabled = () => {
		return checkIfObjectKeyIsEmpty(appraisals);
	};

	if (loading) {
		return <Loading />;
	}

	let buttonText = "Create";
	if (props.updating && !loading) {
		buttonText = "Update";
	} else if (loading) {
		buttonText = "Loading...";
	}

	return (
		<Stack direction="row" spacing={10} sx={{ width: "80%" }}>
			{/* Left side - Form */}
			<Box
				sx={{
					width: "100%", // Adjust the width as per your requirement
					backgroundColor: "bw.backgroundColor",
					borderRadius: (theme) => theme.shape.borderRadius * 0.3,
					borderWidth: 1,
					borderColor: "bw.blackLightest",
					borderStyle: "solid",
					padding: (theme) => theme.spacing(10, 30, 10, 30),
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
				}}
			>
				{/* Your existing form components */}
				<FormTitle />
				<AppraisalName />
				<AppraisalYear />
				<AppraisalType />
				<Team />
				<RoleTeam />

				<AppraisalflowId appraisalflows={appraisalflow} />

				<AppraisalKpi kpis={data} />
				<Stack
					mt={10}
					sx={{
						alignItems: "end",
					}}
				>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						size="large"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 0.1,
							maxWidth: "30%",
						}}
						disabled={loading || disabled()}
						onClick={onSubmit}
					>
						{buttonText}
					</Button>
				</Stack>
				{/* <Link to="/ViewTeamKpi">view team & kpi's</Link> */}
			</Box>

			<Box
				sx={{
					width: "20%",
				}}
			>
				<EmpList />
			</Box>
		</Stack>
	);
};

export default Form;
