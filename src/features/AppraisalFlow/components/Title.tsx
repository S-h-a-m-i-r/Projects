import { Typography } from "@mui/material";
import React from "react";

const Title: React.FC = () => {
	return (
		<Typography
			sx={{
				fontSize: (theme) => theme.typography.fontSize * 1.6,
				color: "bw.greyLightest",
				fontWeight: (theme) => theme.typography.fontWeightMedium,
				textAlign: "center",
				mt: -17,
			}}
		>
			Create Appraisal Flow
		</Typography>
	);
};

export default Title;
