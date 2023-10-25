import React, { useState, useEffect } from "react";
import { Alert, MenuItem, SelectChangeEvent } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select from "components/Select";
import { getAppraisalList } from "libs/redux/appraisals/appraisal.action";
import { APPRAISAL } from "libs/redux/appraisals/appraisal.action";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import Link from "components/Link";
import DeleteModal from "./Delete";
import { delAppraisalList } from "../../../libs/redux/appraisals/appraisal.action";
import AppraisalsRow from "./AppraisalsRow";
import Loading from "components/loading";

const AppraisalList: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [id, setId] = useState<number | undefined>(undefined);
	const [showViewModal, setViewModal] = useState(false);
	const { payload } = useAppSelect((state) => state.appraisalList);
	const { loading } = useAppSelect((state) => state.appraisalList);
	const [showDeletedModal, setDeletedModal] = useState<boolean>(() => false);
	useEffect(() => {
		dispatch(getAppraisalList());
	}, [dispatch]);
	const [selectedStatus, setSelectedStatus] = useState("All");
	const handleStatusChange = (e: SelectChangeEvent<any>) => {
		setSelectedStatus(e.target.value);
	};
	const handleAppraisal = () => {
		navigate("/appraisalform");
	};
	const handleDelete = (id: number) => {
		dispatch(delAppraisalList(id));
	};
	if (loading) {
		return <Loading />;
	}
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				padding: (theme) => theme.spacing(10),
			}}
		>
			<Box
				sx={{
					backgroundColor: "bw.backgroundColor",
					borderWidth: 1,
					borderColor: "bw.blackLightest",
					borderStyle: "solid",
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
					width: 1000,
					position: "relative",
					padding: (theme) => theme.spacing(10),
					borderRadius: (theme) => theme.shape.borderRadius * 0.1,
				}}
			>
				<Typography
					mt={7}
					ml={7}
					variant="h4"
					sx={{
						color: "bw.black",
						fontWeight: (theme) => theme.typography.fontWeightMedium,
						marginBottom: (theme) => theme.spacing(4),
					}}
				>
					Appraisal List
				</Typography>
				<Button
					type="button"
					variant="contained"
					size="medium"
					sx={{
						position: "absolute",
						top: (theme) => theme.spacing(20),
						right: (theme) => theme.spacing(33),
						backgroundColor: (theme) => theme.palette.primary.main,
						color: "white",
					}}
					onClick={handleAppraisal}
				>
					Create Appraisal
				</Button>
				<TableContainer
					sx={{
						padding: (theme) => theme.spacing(5),
					}}
				>
					<Table>
						<TableHead sx={{ alignItems: "center" }}>
							<TableCell>Name</TableCell>
							<TableCell>Year</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Supervisor</TableCell>
							<TableCell>Flow</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>
								<Select
									sx={{
										width: "13.7%",
										height: "2.8%",
										position: "absolute",
										top: (theme) => theme.spacing(47),
										right: (theme) => theme.spacing(33),
										boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
										borderRadius: (theme) => theme.shape.borderRadius * 0.1,
									}}
									IconComponent={KeyboardArrowDownIcon}
									displayEmpty
									placeholder="Select Type"
									value={selectedStatus}
									onChange={handleStatusChange}
								>
									<MenuItem value="All">All</MenuItem>
									<MenuItem value="Active">Active</MenuItem>
									<MenuItem value="Expired">Expired</MenuItem>
									<MenuItem value="Ready-to-Kickoff" disabled>
										Ready-to-Kickoff
									</MenuItem>
								</Select>
							</TableCell>
						</TableHead>
						{Array.isArray(payload) && payload.length > 0 ? (
							payload
								.filter((appraisal: APPRAISAL) => {
									if (selectedStatus === "All") {
										return true;
									} else if (selectedStatus === "Active") {
										return appraisal.status === false;
									} else if (selectedStatus === "Expired") {
										return appraisal.status === true;
									}

									return true;
								})
								.map((appraisal: APPRAISAL, index: number) => <AppraisalsRow appraisal={appraisal} key={index} />)
						) : (
							<TableRow>
								<TableCell colSpan={7}>
									<Alert severity="info" sx={{ textAlign: "center" }}>
										No Appraisal in the List.
									</Alert>
								</TableCell>
							</TableRow>
						)}
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
};

export default AppraisalList;
