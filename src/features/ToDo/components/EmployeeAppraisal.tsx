import EmployeeCard from "./EmployeeCard";
import { Box, Stack, Typography } from "@mui/material";
import Observatory from "./Observatory";
import Feedback from "./Feedback";
import Measured from "./Measured";
import Questionaire from "./Questionaire";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import React, { useEffect, useState } from "react";
import { APPRAISAL, TODO, createScore, getTodo, getTodoById } from "../ducks/todo.actions";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface EmployeeAppraisalProps {
	updating?: boolean;
}

const EmployeeAppraisal: React.FC<EmployeeAppraisalProps> = (props) => {
	const [updatedData, setUpdatedData] = useState<TODO[] | undefined>(undefined);
	const [updated, setUpdated] = useState<APPRAISAL[] | undefined>(undefined);

	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();
	console.log(id);
	const { getkpi } = useAppSelect((state) => state.todo);
	const { getAppraisalKpi } = useAppSelect((state) => state.todo);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const appraisalKpisId = queryParams.get("id");
	const navigate = useNavigate();
	// Get the history object from react-router-dom
	// const history = useHistory();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// await dispatch(createScore());

		// Show the confirmation alert
		const isConfirmed = window.confirm("Thank you! Your response has been submitted.");

		// Redirect to the default page if user clicks "OK" in the alert
		if (isConfirmed) {
			// Replace "/default-page" with the path of your default page
			navigate("/todo");
		}
	};

	useEffect(() => {
		if (id) {
			dispatch(getTodo())
				.then(() => {
					const Todo = getkpi?.payload?.filter((ele) => ele.id === Number(id));
					setUpdatedData(Todo);
				})
				.catch((error) => {
					console.error("Error fetching todo:", error);
				});
		}
		if (id) {
			dispatch(getTodoById(id));
			const Todo =
				getAppraisalKpi.payload && Array.isArray(getAppraisalKpi.payload)
					? getAppraisalKpi.payload.filter((ele) => ele.appraisal_id === Number(id))
					: [];
			setUpdated(Todo);
		}
	}, [id]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "space-between",
				}}
			>
				<Stack ml={100}>
					<Box
						component="img"
						src="/images/logo/teo.png"
						alt="teo-logo"
						sx={{
							width: 110,
							height: 62,
							ml: 20,
							mt: 13,
						}}
					/>
					<EmployeeCard />
				</Stack>
				<Stack mr={100} mt={20}>
					<Typography
						sx={{
							fontWeight: (theme) => theme.typography.fontWeightMedium,
							fontSize: (theme) => theme.typography.fontSize * 2,
							fontFamily: (theme) => theme.typography.fontFamily,
						}}
					>
						Employee Appraisal
					</Typography>
					<Questionaire />
					<Feedback />
					<Observatory />
					<Measured />
					<Button
						type="button"
						variant="contained"
						fullWidth
						size="medium"
						sx={{
							width: "25%",
							bottom: "2%",
							left: "75%",
							margin: (theme) => theme.spacing(25, 15, 15, 15),
						}}
						onClick={onSubmit}
					>
						Submit
					</Button>
				</Stack>
			</Box>
		</>
	);
};

export default EmployeeAppraisal;
