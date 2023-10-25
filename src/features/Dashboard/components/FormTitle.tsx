import { Typography } from "@mui/material";
import React from "react";

const FormTitle: React.FC = () => {
	return (
		<Typography
			sx={{
				fontSize: (theme) => theme.typography.fontSize * 2,
				color: "bw.greyLightest",
				fontWeight: (theme) => theme.typography.fontWeightMedium,
			}}
		>
			Create KPI
		</Typography>
	);
};

export default FormTitle;
