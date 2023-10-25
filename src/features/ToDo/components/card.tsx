import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Divider, Avatar, CardHeader } from "@mui/material";
import Link from "components/Link";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { TODO, getTodo } from "../ducks/todo.actions";
import { useParams } from "react-router-dom";

interface CardsProps {
	updating?: boolean;
}
const ViewCard: React.FC<CardsProps> = (props) => {
	const [updatedData, setUpdatedData] = useState<TODO[] | undefined>(undefined);
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const { payload } = useAppSelect((state) => state.todo.getkpi);
	// console.log("000000000000000000000", getkpi);
	useEffect(() => {
		if (id) {
			dispatch(getTodo())
				.then(() => {
					console.log("=====================>" + id);
					const Todo = payload.filter((ele) => ele.id === Number(id));
					console.log("----------------->", Todo);
					setUpdatedData(Todo);
				})
				.catch((error) => {
					console.error("Error fetching todo:", error);
				});
		}
	}, [id, dispatch, payload.length]);
	console.log("************", updatedData);

	return (
		<Card
			variant="outlined"
			sx={{
				width: "30vw",
				boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
				marginBottom: (theme) => theme.spacing(15),
				borderRadius: (theme) => theme.shape.borderRadius * 0.2,
			}}
		>
			<Link to={`/appraisals/employees/${id}/appraisal_kpis?id=${updatedData?.[0]?.employee_data?.[0].id}`}>
				<CardHeader
					avatar={<Avatar sx={{ marginLeft: (theme) => theme.spacing(15) }} src="/public/images/EmpList/Emp01.jpg" />}
					title={
						<Typography sx={{ fontWeight: (theme) => theme.typography.fontWeightBold, color: "bw.black" }}>
							{updatedData?.[0]?.employee_data?.[0]?.employee_name}
						</Typography>
					}
					subheader={
						<Typography sx={{ fontWeight: (theme) => theme.typography.fontWeightRegular, color: "bw.black" }}>
							{updatedData?.[0]?.employee_data?.[0]?.designation_name}
						</Typography>
					}
				/>
			</Link>
			<Divider
				orientation="horizontal"
				flexItem
				sx={{
					margin: "0 10px",
				}}
			/>
			<CardContent
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Typography
					sx={{
						flex: 1,
						textAlign: "center",
						fontWeight: (theme) => theme.typography.fontWeightBold,
					}}
				>
					{updatedData?.[0]?.appraisal_year}
				</Typography>
				<Divider orientation="vertical" flexItem sx={{ margin: "0 10px" }} />
				<Typography
					sx={{
						flex: 1,
						textAlign: "center",
						fontWeight: (theme) => theme.typography.fontWeightBold,
					}}
				>
					{updatedData?.[0]?.employee_data?.[0]?.appraisal_status ? "Complete" : "Pending"}
				</Typography>
			</CardContent>
		</Card>
	);
};
export default ViewCard;
