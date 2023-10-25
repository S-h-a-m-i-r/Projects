import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmpDialog from "./EmpDialog";
import Link from "components/Link";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { getEmployeeList } from "libs/redux/employees/employees.actions";
import { Employee } from "libs/redux/employees/employees.state";

const EmpList: React.FC = () => {
	const [openDialog, setOpenDialog] = React.useState(false);
	const [selectedEmp, setSelectedEmp] = React.useState<number | null>(null);

	const handleClick = (employeeId: number) => {
		setSelectedEmp(employeeId);
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
		setSelectedEmp(null);
	};

	const dispatch = useAppDispatch();

	const { emplist } = useAppSelect((state) => state.employeesList);

	useEffect(() => {
		dispatch(getEmployeeList());
	}, [dispatch]);

	const imageUrls = [
		"https://res.cloudinary.com/people-matters/image/upload/fl_immutable_cache,w_624,h_351,q_auto,f_auto/v1663579184/1663579182.jpg",
		"https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?cs=srgb&dl=pexels-emmy-e-2381069.jpg&fm=jpg",
		"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbG95ZWV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
		"https://img.freepik.com/free-photo/smiling-blonde-business-woman-posing-with-crossed-arms_171337-6291.jpg?w=2000",
		"https://img.freepik.com/free-photo/confident-pretty-business-woman-with-arms-crossed_1262-2992.jpg?w=2000",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSU8ilsiXDrqvJYRukcmGl4BT0RRBnfidIOkEH91ICdOlEZDc0jWducIbl5zUcGDlJe-g&usqp=CAU",
		"https://www.clickingwithkristin.com/wp-content/uploads/2020/01/josker-8970-687x1030.jpg",
		"https://images.squarespace-cdn.com/content/v1/54827b6ae4b0e92f1bafc45e/1558491066389-3J4BZ6NJCBD5K7H9MS65/Headshot+Photographer+Charlottesville.JPG?format=1000w",
		"https://thumbs.dreamstime.com/z/head-shot-handsome-millennial-s-professional-employee-worker-posing-camera-modern-office-business-portrait-creative-202154925.jpg",
	];

	return (
		<>
			<Box
				sx={{
					backgroundColor: "bw.backgroundColor",
					borderRadius: (theme) => theme.shape.borderRadius * 0.3,
					borderWidth: 1,
					borderColor: "bw.blackLightest",
					borderStyle: "solid",
					padding: (theme) => theme.spacing(10),
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
					marginLeft: (theme) => theme.spacing(30),
				}}
			>
				<Typography
					my={4}
					sx={{
						fontSize: (theme) => theme.typography.fontSize * 1.5,
						color: "bw.greyLightest",
						fontWeight: (theme) => theme.typography.fontWeightLight,
					}}
				>
					Emp List
				</Typography>
				<Stack direction="column" spacing={3} sx={{ alignItems: "center", maxHeight: "100vh", overflowY: "auto" }}>
					{emplist?.empdetails?.slice(0, 8).map((employee: Employee, index: number) => (
						<Avatar
							key={employee.employeeId}
							alt={employee.name}
							src={imageUrls[index % imageUrls.length]} // Use index to select image URL from the array
							sx={{ cursor: "pointer", height: 58, width: 58 }}
							onClick={() => handleClick(employee.employeeId)}
						/>
					))}
					<Link to="/addemployee">
						<AddCircleIcon sx={{ height: 58, width: 58, color: "bw.black", cursor: "pointer" }} />
					</Link>
				</Stack>
			</Box>
			{openDialog && (
				<EmpDialog
					open={openDialog}
					onClose={handleClose}
					name={
						emplist.empdetails.find((employee: { employeeId: number | null }) => employee.employeeId === selectedEmp)
							?.name || ""
					}
					imageSrc=""
					position={""}
				/>
			)}
		</>
	);
};

export default EmpList;
