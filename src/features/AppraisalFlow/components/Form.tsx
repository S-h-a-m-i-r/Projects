import { Box, Button, Stack } from "@mui/material";
import BaseLayout from "layout/BaseLayout";
import Title from "./Title";
import React from "react";
import Name from "./Name";
import SelectTeam from "./SelectTeam";
import AppraisalType from "./AppraisalType";
import AddSteps from "./AddSteps";
import Link from "components/Link";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { addAppraisal, updateAppraisal } from "../ducks/appraisalFlow.actions";
import { useNavigate } from "react-router-dom";
import SelectRole from "./SelectID";
import checkIfObjectKeyIsEmpty from "utils/checkIfObjectKeyIsEmpty";

type FormProps = {
	updating?: boolean;
};

const Form: React.FC<FormProps> = (props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelect((state) => state.user);
	const { payload, error, loading: flowLoading } = useAppSelect((state) => state.appraisalFlow);
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (props.updating) {
			await dispatch(updateAppraisal());
		} else {
			await dispatch(addAppraisal());
		}

		if (error && !flowLoading) {
			return;
		}

		return navigate("/appraisalflow", { replace: true });
	};

	const disabled = () => {
		return checkIfObjectKeyIsEmpty(payload);
	};

	let buttonText = "Create";
	if (props.updating && !loading) {
		buttonText = "Update";
	} else if (loading) {
		buttonText = "Loading...";
	}

	return (
		<>
			<BaseLayout>
				<Box
					sx={{
						display: "flex",
						minHeight: "100vh",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
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
						<Stack sx={{ mt: 10 }}>
							<Title />
						</Stack>
						<Name />
						<SelectTeam />
						<SelectRole />
						<AppraisalType />
						<h2>Steps</h2>
						<AddSteps />

						<Stack
							mt={10}
							sx={{
								alignItems: "end",
							}}
						>
							<Link to="/appraisalflow">
								<Button
									type="button"
									variant="contained"
									fullWidth
									size="large"
									sx={{
										marginTop: (theme) => theme.spacing(10),
									}}
									disabled={loading || disabled()}
									onClick={onSubmit}
								>
									{buttonText}
								</Button>
							</Link>
						</Stack>
					</Box>
				</Box>
			</BaseLayout>
		</>
	);
};

export default Form;
