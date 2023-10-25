import React, { useState } from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import { useAppDispatch } from "hooks/reduxHook";
import { APPRAISALFLOW, STEP, delAppraisal, getAppraisal } from "../ducks/appraisalFlow.actions";
import Link from "components/Link";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteModal from "./Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ActiveButton from "./ActiveButton";
import Loading from "components/loading";

interface AppraisalsProps {
	appraisalflow: APPRAISALFLOW;
}

const Appraisals: React.FC<AppraisalsProps> = ({ appraisalflow }) => {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [isLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleDelete = async (id: number) => {
		dispatch(delAppraisal(id));
		await dispatch(getAppraisal());
	};

	return (
		<>
			<Card
				sx={{
					boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.25);",
					width: "23%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<CardContent sx={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Stack direction="row" alignItems="center">
							<ActiveButton />
							<Stack direction="row">
								<Link to={`/createappraisal/${appraisalflow.id}`} sx={{ mr: 10, ml: 40, mb: 9 }}>
									{isLoading ? (
										<Loading />
									) : (
										<EditOutlinedIcon
											fontSize="small"
											sx={{
												backgroundColor: "bw.white",
												color: "bw.black",
												borderRadius: (theme) => theme.shape.borderRadius * 5,
											}}
										/>
									)}
								</Link>

								<Link to="#" onClick={() => setShowDeleteModal(true)}>
									<DeleteRoundedIcon
										fontSize="small"
										sx={{
											backgroundColor: "bw.white",
											color: "bw.black",
											borderRadius: (theme) => theme.shape.borderRadius * 5,
										}}
									/>
								</Link>
							</Stack>
						</Stack>
					</div>
					<Typography
						variant="body2"
						sx={{
							fontSize: "150%",
						}}
					>
						{appraisalflow.flow_name}
					</Typography>

					<Typography
						variant="body2"
						sx={{
							fontSize: "85%",
						}}
					>
						{appraisalflow.assign_type_name}
					</Typography>

					<Typography
						variant="body2"
						sx={{
							fontSize: "120%",
							fontWeight: 500,
							mt: 2,
						}}
					>
						{appraisalflow.appraisal_type}
					</Typography>

					<Typography
						variant="body2"
						sx={{
							fontSize: "115%",
							display: "flex",
							alignItems: "center",
							mt: 5,
							fontWeight: 550,
						}}
					>
						<span>created by:</span>
						<span style={{ marginLeft: "35%" }}>{appraisalflow.created_by}</span>
					</Typography>

					<div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
						<span>Step Name</span>
						<span>Step Order</span>
					</div>

					{appraisalflow.flow_steps.map((step: STEP, index: number) => (
						<div
							key={step.id}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span>
								{index + 1}. {step.step_name}
							</span>
							<span>{step.step_order}</span>
						</div>
					))}
				</CardContent>
			</Card>
			<DeleteModal
				open={showDeleteModal}
				handleOnClose={() => setShowDeleteModal(false)}
				appraisalflow={appraisalflow}
				onDelete={() => {
					if (appraisalflow.id) handleDelete(appraisalflow.id);
				}}
			/>
		</>
	);
};

export default Appraisals;
