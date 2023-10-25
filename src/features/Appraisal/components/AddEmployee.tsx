import React, { useEffect } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Avatar,
	Typography,
} from "@mui/material";
import BaseLayout from "layout/BaseLayout";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { Employee } from "libs/redux/employees/employees.state";
import { getEmployeeList } from "libs/redux/employees/employees.actions";

const AddEmployee: React.FC = () => {
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
		"https://media.licdn.com/dms/image/C4D03AQE7OciWM925vw/profile-displayphoto-shrink_800_800/0/1633448105753?e=2147483647&v=beta&t=kGJ3ZFyBKY1LzSOq3f1q1IJ0U3yJaohS5X5a0srC8rM",
		"https://www.nordstudio.ch/wp/wp-content/uploads/2018/02/mitarbeiter-business-fotos_08.jpg",
		"https://www.viennashots.com/wp-content/uploads/2021/05/Mitarbeiterportraits_Wien_Detail-58-e1559232158493.jpg",
		"https://img.freepik.com/premium-photo/close-up-confident-bearded-businessman-gray-suit_1258-33534.jpg",
		"https://etimg.etb2bimg.com/photo/93893896.cms",
		"https://www.evansfaull.com.au/hubfs/Stock%20images/Young%20smiling%20executive%20standing%20in%20front%20of%20her%20business%20team.jpeg",
		"https://img.freepik.com/premium-photo/portrait-young-woman-standing-office-with-colleagues-background_709984-2059.jpg?w=2000",
		"https://img.freepik.com/premium-photo/happy-smiling-confident-business-woman-sitting-modern-office-workspace-workplace-portrait-cheerful-joyful-blonde-female-corporate-professional-working-startup-company_590464-78929.jpg?w=360",
		"https://www.stinson.com/assets/htmlimages/BurtonH_Spotlight.jpg",
		"https://www.stinson.com/assets/images-t1689368578/480_small_list.jpeg",
		"https://images.law.com/contrib/content/uploads/sites/405/2023/02/Allison-Murdock1-767x633.jpg",
		"https://www.vorys.com/assets/images-t1689254584/15607_thumb.jpeg",
		"https://www.vorys.com/assets/images-t1687966769/15143_thumb.jpeg",
	];

	return (
		<>
			<BaseLayout>
				<Box
					sx={{
						backgroundColor: "bw.backgroundColor",
						borderRadius: (theme) => theme.shape.borderRadius * 0.2,
						borderWidth: 1,
						borderColor: "bw.blackLightest",
						borderStyle: "solid",
						padding: (theme) => theme.spacing(10),
						boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
						margin: "auto",
						marginTop: (theme) => theme.spacing(15),
						marginBottom: (theme) => theme.spacing(15),
						width: 900,
					}}
				>
					<Typography
						variant="h4"
						sx={{
							color: "bw.black",
							fontWeight: (theme) => theme.typography.fontWeightMedium,
							marginBottom: (theme) => theme.spacing(4),
						}}
					>
						Employee List
					</Typography>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Employee Name</TableCell>
									<TableCell>employee ID</TableCell>
									<TableCell>Address</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{emplist.empdetails.map((employee: Employee, index: number) => (
									<TableRow key={employee.employeeId}>
										<TableCell>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<Avatar alt={employee.name} src={imageUrls[index % imageUrls.length]} />
												<Typography variant="h6" sx={{ marginLeft: 5 }}>
													{employee.name}
												</Typography>
											</Box>
										</TableCell>

										<TableCell>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<Typography variant="h6" sx={{ marginLeft: 5 }}>
													{employee.employeeId}
												</Typography>
											</Box>
										</TableCell>

										<TableCell>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<Typography variant="h6" sx={{ marginLeft: 5 }}>
													{employee.address}
												</Typography>
											</Box>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</BaseLayout>
		</>
	);
};

export default AddEmployee;
