import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import ViewCard from "./card";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header from "./Header";
import { useParams } from "react-router-dom";

const ViewPage: React.FC = () => {
	const params = useParams();

	return (
		<>
			<Header />
			<Stack mt={30} ml={120}>
				<Typography
					variant="h4"
					sx={{
						color: "bw.black",
						fontWeight: (theme) => theme.typography.fontWeightMedium,
						marginTop: (theme) => theme.spacing(6),
					}}
				>
					To-do <ArrowForwardIosIcon /> View
				</Typography>
			</Stack>
			<Stack ml={100} mt={5}>
				<Grid
					item
					md={4}
					sm={8}
					pl={15}
					pt={40}
					sx={{
						backgroundColor: "bw.backgroundColor",
						borderRadius: (theme) => theme.shape.borderRadius * 0.2,
						borderWidth: 1,
						borderColor: "bw.blackLightest",
						borderStyle: "solid",
						boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
						minWidth: "80%",
						maxWidth: "80%",
						position: "relative",
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: "10%",
					}}
				>
					{<ViewCard updating={params?.id ? true : false} />}
				</Grid>
			</Stack>
		</>
	);
};
export default ViewPage;
