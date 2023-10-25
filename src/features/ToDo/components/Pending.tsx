import React, { useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Divider, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";

import { getAppraisalList } from "libs/redux/appraisals/appraisal.action";

import { TODO, getTodo } from "../ducks/todo.actions";
const Pending = () => {
	const dispatch = useAppDispatch();
	const { payload } = useAppSelect((state) => state.appraisalList);

	const navigate = useNavigate();

	const { getkpi } = useAppSelect((state) => state.todo);

	const viewpage = (todo: TODO) => {
		navigate(`/view/${todo.id}`);
	};
	useEffect(() => {
		dispatch(getTodo());
	}, [dispatch]);

	return (
		<>
			<Box
				sx={{
					backgroundColor: "bw.backgroundColor",
					borderRadius: (theme) => theme.shape.borderRadius * 0.2,
					borderWidth: 1,
					borderColor: "bw.blackLightest",
					borderStyle: "solid",
					padding: (theme) => theme.spacing(10),
					boxShadow: (theme) => theme.palette.advancedShadow.simpleShadow,
					margin: "auto",
					marginTop: (theme) => theme.spacing(15),
					marginBottom: (theme) => theme.spacing(15),
					width: 1050,
				}}
			>
				<Typography
					variant="h4"
					sx={{
						color: "bw.black",
						fontWeight: (theme) => theme.typography.fontWeightMedium,
						marginBottom: (theme) => theme.spacing(4),
						fontSize: 25,
					}}
				>
					TO-DO
				</Typography>
				<Divider />
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>NAME</TableCell>
							<TableCell title="Teams, Individuals, Roles">T/I/R</TableCell>
							<TableCell title="seleted value from role , team ,individual">selected type</TableCell>
							<TableCell>YEAR</TableCell>
							<TableCell>TYPE</TableCell>
							<TableCell>STATUS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Array.isArray(getkpi.payload) &&
							getkpi.payload.map((todo: TODO) => (
								<TableRow
									key={todo.id}
									sx={{
										borderRadius: "12px",
										boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.2)",
										marginBottom: "10px",
										marginTop: "10px",
									}}
								>
									<TableCell>
										<Typography>{todo.appraisal_name}</Typography>
									</TableCell>
									<TableCell>
										<Typography>{todo.appraisal_for}</Typography>
									</TableCell>

									<TableCell>
										<Typography>{todo.appraisal_for_name}</Typography>
									</TableCell>

									<TableCell>
										<Typography>{todo.team_id}</Typography>

										<Typography>{todo.appraisal_year}</Typography>
									</TableCell>
									<TableCell>
										<Typography> {todo.appraisal_type} </Typography>
									</TableCell>

									<TableCell>{todo.status ? "Completed" : "Pending"}</TableCell>
									<TableCell align="left">
										<Button
											sx={{
												backgroundColor: "#DCDCDC",
												mr: 10,
												color: "black",
											}}
										>
											view
										</Button>
										<Button
											onClick={() => viewpage(todo)}
											sx={{
												backgroundColor: "#7CC08B",
												color: "white",
											}}
										>
											<ArrowForwardIcon />
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</Box>
		</>
	);
};

export default Pending;
