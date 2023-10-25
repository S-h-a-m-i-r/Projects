import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import DeleteModal from "./Delete";
import { useAppDispatch } from "hooks/reduxHook";
import { KPI, delKpi, getKpi } from "../ducks/kpilist.actions";
import Link from "components/Link";

interface CardsProps {
	kpi: KPI;
}

const Cards: React.FC<CardsProps> = ({ kpi }) => {
	const dispatch = useAppDispatch();

	const [showDeletedModal, setDeletedModal] = useState<boolean>(() => false);

	useEffect(() => {
		getKpi();
	}, []);

	const handleDelete = async (id: number) => {
		dispatch(delKpi(id));
		try {
			await dispatch(getKpi());
			getKpi();
		} catch (error) {
			console.error("Error deleting KPI:", error);
		}
	};

	return (
		<>
			<Card
				sx={{
					color: "bw.white",
					height: "47vh",
					minWidth: "17vw",
					maxWidth: "17vw",
					bgcolor: "secondary.main",
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
				}}
			>
				<CardContent
					sx={{
						padding: (theme) => theme.spacing(0),
					}}
				>
					<Typography
						textAlign="center"
						sx={{
							fontSize: (theme) => theme.typography.fontSize * 1.5,
							color: "bw.white",
							height: "9vh",
							fontFamily: (theme) => theme.typography.fontFamily,
							fontWeight: (theme) => theme.typography.fontWeightLight,
							backgroundColor: (theme) => theme.palette.secondary.dark,
							marginTop: "10%",
						}}
					>
						{kpi.kpi_name}
					</Typography>
					<Stack
						sx={{
							color: "bw.black",
							bgcolor: "bw.white",
							height: "25vh",
							fontSize: (theme) => theme.typography.fontSize,
							fontWeight: (theme) => theme.typography.fontWeightRegular,
							fontFamily: (theme) => theme.typography.fontFamily,
						}}
					>
						<Typography
							sx={{
								paddingTop: (theme) => theme.spacing(1),
								paddingLeft: (theme) => theme.spacing(5),
							}}
						>
							&bull; {kpi.assign_type_id}
							<br />
							&bull; {kpi.kpi_type}
							<br />
							&bull; {kpi.applicable_for}
							<br />
						</Typography>
						<Typography
							sx={{
								paddingTop: (theme) => theme.spacing(1),
								paddingLeft: (theme) => theme.spacing(5),
								overflow: "hidden",
							}}
						>
							{kpi.kpi_description}
						</Typography>
					</Stack>
					<Stack
						mt={6}
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							bgcolor: "secondary.main",
						}}
					>
						<Link
							to={`/dashboard/${kpi.id}`}
							sx={{
								backgroundColor: "bw.white",
								color: "bw.black",
								marginLeft: (theme) => theme.spacing(6),
								padding: (theme) => theme.spacing(5, 12, 5, 12),
								fontSize: (theme) => theme.typography.fontSize * 1.5,
								fontWeight: (theme) => theme.typography.fontWeightLight,
								borderRadius: (theme) => theme.shape.borderRadius * 0.1,
								minWidth: "20%",

								textAlign: "center",
							}}
						>
							<Typography>Edit</Typography>
						</Link>
						<Link
							to="#"
							onClick={() => setDeletedModal(true)}
							sx={{
								backgroundColor: (theme) => theme.palette.primary.main,
								color: "bw.white",
								marginRight: (theme) => theme.spacing(6),
								padding: (theme) => theme.spacing(5, 12, 5, 12),
								fontSize: (theme) => theme.typography.fontSize * 1.5,
								borderRadius: (theme) => theme.shape.borderRadius * 0.1,
								minWidth: "20%",
								":hover": {
									backgroundColor: "bw.white",
									color: "bw.black",
								},
							}}
						>
							<Typography>Delete</Typography>
						</Link>
					</Stack>
				</CardContent>
			</Card>
			<DeleteModal
				open={showDeletedModal}
				handleOnClose={() => setDeletedModal(false)}
				kpi={kpi}
				onDelete={() => {
					if (kpi.id) handleDelete(kpi.id);
				}}
			/>
		</>
	);
};

export default Cards;
