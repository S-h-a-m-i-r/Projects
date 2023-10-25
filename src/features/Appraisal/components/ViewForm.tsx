import React, { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import FormTitle from "./FormTitle";
import AppraisalYear from "./AppraisalYear";
import AppraisalType from "./AppraisalType";
import Supervisor from "./Supervisor";
import Team from "./Team";
import AppraisalKpi from "./AppraissalKpi";
import AppraisalName from "./AppraisalName";
import AppraisalflowId from "./AppraisalflowId";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { createAppraisalList, updateAppraisals } from "../ducks/appraisals.actions";
import { useNavigate } from "react-router-dom";

import Loading from "components/loading";
import { APPRAISAL } from "libs/redux/appraisals/appraisal.action";

type FormProps = {
	updating?: boolean;
};
const Form: React.FC<FormProps> = (props) => {
	const { appraisalflow } = useAppSelect((state) => state.appraisalFlow);
	const { data } = useAppSelect((state) => state.kpiList);
	const dispatch = useAppDispatch();
	const { error, loading } = useAppSelect((state) => state.appraisals);
	const navigate = useNavigate();
	const [updateData, setUpdateData] = useState<APPRAISAL[] | undefined>(undefined);

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

	if (loading) {
		return <Loading />;
	}

	return (
		<Stack sx={{ width: "50%" }}>
			<Box
				sx={{
					backgroundColor: "bw.backgroundColor",
					borderRadius: (theme) => theme.shape.borderRadius * 0.3,
					borderWidth: 1,
					borderColor: "bw.blackLightest",
					borderStyle: "solid",
					padding: (theme) => theme.spacing(10, 30, 10, 30),
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
					margin: (theme) => theme.spacing(5, 0, 5, 0),
				}}
			>
				<Stack sx={{ pointerEvents: "none" }}>
					<FormTitle />
					<AppraisalName />
					<AppraisalYear />
					<AppraisalType />
					<Team />
					<Supervisor />
					<AppraisalflowId appraisalflows={appraisalflow} />
					<AppraisalKpi kpis={data} />
				</Stack>
				<Stack
					mt={10}
					sx={{
						alignItems: "end",
						padding: (theme) => theme.shape.borderRadius * 0.3,
					}}
				>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						size="large"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 0.1,
							maxWidth: "20%",
						}}
						onClick={onSubmit}
					>
						{loading ? "Please wait..." : "Back"}
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};

export default Form;
