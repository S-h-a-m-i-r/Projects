import { Box, Button, Stack } from "@mui/material";
import BaseLayout from "layout/BaseLayout";
import React, { useEffect, useState } from "react";
import Title from "./Title";
import Name from "./Name";
import SelectTeam from "./SelectTeam";
import AppraisalType from "./AppraisalType";
import AddSteps from "./AddSteps";
import CreatedBy from "./CreatedBy";
import Link from "components/Link";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { useParams, useNavigate } from "react-router-dom";
import { APPRAISALFLOW, updateAppraisal } from "../ducks/appraisalFlow.actions";

const Update = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [updateData, setUpdateData] = useState<APPRAISALFLOW[] | undefined>(undefined);

	const { appraisalflow } = useAppSelect((state) => state.appraisalFlow);
	useEffect(() => {
		if (id && id.length > 0) {
			const singleappraisal = appraisalflow.filter((ele) => id.includes(ele.flow_name));
			setUpdateData(singleappraisal);
		}
	}, [id, appraisalflow]);

	const handleUpdate = (e: React.MouseEvent) => {
		e.preventDefault();
		// dispatch(updateAppraisal(String(id)));
		navigate("/appraisalflow");
	};

	const { loading } = useAppSelect((state) => state.appraisalFlow);

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
							padding: (theme) => theme.spacing(20),
							boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
						}}
					>
						<Stack sx={{ mb: 10 }}>
							<Title />
						</Stack>
						<Name initialValue={updateData?.[0]?.flow_name || ""} />

						<SelectTeam initialValue={updateData?.[0]?.assign_type_id} />

						<Stack
							sx={{
								mt: 10,
							}}
						>
							<CreatedBy initialValue={updateData?.[0]?.created_by} />
						</Stack>

						<AppraisalType initialValue={updateData?.[0]?.appraisal_type} />
						<h2> steps</h2>
						<AddSteps initialValue={updateData?.[0]?.flow_steps} />

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
									disabled={loading}
									onClick={handleUpdate}
								>
									{loading ? "Please wait..." : "Save"}
								</Button>
							</Link>
						</Stack>
					</Box>
				</Box>
			</BaseLayout>
		</>
	);
};

export default Update;
