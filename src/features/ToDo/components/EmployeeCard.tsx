import { Card, CardActionArea, CardContent, Typography, Stack, Divider } from "@mui/material";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import React, { useEffect, useState } from "react";
import { TODO, getTodo } from "../ducks/todo.actions";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
interface EmployeeCardProps {
	updating?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = (props) => {
	const [updatedData, setUpdatedData] = useState<TODO[] | undefined>(undefined);
	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string }>();

	const { getkpi } = useAppSelect((state) => state.todo);

	useEffect(() => {
		if (id) {
			// dispatch(getTodo())
			// 	.then(() => {
			const Todo = getkpi.payload?.filter((ele) => ele.id === Number(id));
			setUpdatedData(Todo);
			// })
			// .catch((error) => {
			// 	console.error("Error fetching todo:", error);
			// });
		}
	}, [getkpi]);

	return (
		<>
			<Card
				sx={{
					width: "20vw",
					marginLeft: (theme) => theme.spacing(1),
					marginTop: (theme) => theme.spacing(15),
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
				}}
			>
				<CardActionArea
					sx={{
						borderWidth: 1,
						borderColor: "bw.blackLightest",
						borderStyle: "solid",
					}}
				>
					<Stack alignItems={"center"} flex={1} mt={10}>
						{/* <img src="/images/EmpList/Emp01.jpg" alt="" style={{ width: "65%", borderRadius: "50%", height: "25vh" }} /> */}

						<Avatar
							alt="Employee Image"
							src={updatedData?.[0]?.employee_data?.[0].employee_image}
							sx={{ width: 150, height: 150, marginTop: (theme) => theme.spacing(10) }}
						/>
					</Stack>
					<CardContent>
						<Typography
							textAlign={"center"}
							sx={{
								fontWeight: (theme) => theme.typography.fontWeightLight,
								fontSize: (theme) => theme.typography.fontSize * 2,
								fontFamily: (theme) => theme.typography.fontFamily,
								color: "bw.black",
							}}
						>
							{updatedData?.[0]?.employee_data?.[0].employee_name}
						</Typography>
						<Typography
							textAlign={"center"}
							mb={10}
							sx={{
								fontWeight: (theme) => theme.typography.fontWeightRegular,
								fontSize: (theme) => theme.typography.fontSize,
								fontFamily: (theme) => theme.typography.fontFamily,
								color: "bw.black",
							}}
						>
							{updatedData?.[0]?.employee_data?.[0].designation_name}
						</Typography>
						<Divider
							orientation="horizontal"
							flexItem
							sx={{
								margin: "0 10px",
							}}
						/>
						<Stack
							mt={10}
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Stack sx={{ marginRight: 0 }}>
								<Typography mb={14}>Team</Typography>
								<Typography mb={14}>Year</Typography>
								<Typography mb={14}>Type</Typography>
								<Typography>Status</Typography>
							</Stack>
							<Stack sx={{ marginLeft: 25 }}>
								<Typography mb={14}>{updatedData?.[0]?.appraisal_name}</Typography>
								<Typography mb={14}>{updatedData?.[0]?.appraisal_year}</Typography>
								<Typography mb={14}>{updatedData?.[0]?.appraisal_type}</Typography>
								<Typography>{updatedData?.[0]?.status ? "complete" : "pending"}</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
};

export default EmployeeCard;
