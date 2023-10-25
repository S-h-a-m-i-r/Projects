import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading: React.FC = () => {
	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 50 }}>
				<CircularProgress color="secondary" />
			</Box>
		</>
	);
};

export default Loading;
