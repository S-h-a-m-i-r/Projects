import React from "react";
import { Box, Stack, Button } from "@mui/material";
import KpiType from "./KpiType";
import KpiAssignType from "./KpiAssignType";
import FormTitle from "./FormTitle";
import KpiWeight from "./KpiWeight";
import KpiName from "./KpiName";
import KpiApplicable from "./KpiApplicable";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { createKpi, updateKpi } from "../ducks/dashboard.actions";
import KpiDescription from "./KpiDesc";
import { useNavigate } from "react-router-dom";
import checkIfObjectKeyIsEmpty from "utils/checkIfObjectKeyIsEmpty";
import SelectType from "./Select";

type FormProps = {
	updating?: boolean;
};

const Form: React.FC<FormProps> = (props) => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelect((state) => state.user);
	const { kpi, error, loading: kpiLoading } = useAppSelect((state) => state.kpi);
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (props.updating) {
			await dispatch(updateKpi());
		} else {
			await dispatch(createKpi());

			console.log("--------------------->");
		}

		if (error && !kpiLoading) {
			return;
		}

		return navigate("/kpilists", { replace: true });
	};

	const disabled = () => {
		return checkIfObjectKeyIsEmpty(kpi);
	};

	let buttonText = "Create";
	if (props.updating && !loading) {
		buttonText = "Update";
	} else if (loading) {
		buttonText = "Loading...";
	}

	return (
		<Stack sx={{ width: "50%" }}>
			<FormTitle />

			<Box
				sx={{
					backgroundColor: "bw.backgroundColor",
					borderRadius: (theme) => theme.shape.borderRadius * 0.3,
					borderWidth: 1,
					borderColor: "bw.blackLightest",
					borderStyle: "solid",
					padding: (theme) => theme.spacing(10),
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
				}}
			>
				<KpiName />
				<KpiAssignType />
				<SelectType />
				<KpiType />
				<KpiWeight />
				<KpiApplicable />
				<KpiDescription />
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
						// disabled={loading || disabled()}
						onClick={onSubmit}
					>
						{buttonText}
					</Button>
				</Stack>
			</Box>
		</Stack>
	);
};

export default Form;
