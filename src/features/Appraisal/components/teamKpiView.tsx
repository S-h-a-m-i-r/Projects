import React from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Divider } from "@mui/material";

const teamKpiViewPage: React.FC = () => {
	const data = [
		{ name: "design", team: "front-end", year: "2023", type: "Label 4", status: "working" },
		{ name: "server", team: "back-end", year: "2023", type: "Label 9", status: "working" },
		{ name: "database", team: "android", year: "2023", type: "Label 7", status: "working" },
	];

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
					VIEW TEAM AND KPI
				</Typography>
				<Divider />
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>NAME</TableCell>
							<TableCell>TEAM</TableCell>
							<TableCell>YEAR</TableCell>
							<TableCell>TYPE</TableCell>
							<TableCell>STATUS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<TableRow
								key={index}
								sx={{
									borderRadius: "10px",
									boxShadow: "2px 2px 10px 0px rgba(0, 0, 0, 0.2)",
									marginBottom: "10px",
									marginTop: "10px,",
								}}
							>
								<TableCell>
									<Typography>{item.name}</Typography>
								</TableCell>
								<TableCell>
									<Typography>{item.team}</Typography>
								</TableCell>
								<TableCell>
									<Typography>{item.year}</Typography>
								</TableCell>
								<TableCell>
									<Typography>{item.type}</Typography>
								</TableCell>
								<TableCell>
									<Typography>{item.status}</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</>
	);
};

export default teamKpiViewPage;
