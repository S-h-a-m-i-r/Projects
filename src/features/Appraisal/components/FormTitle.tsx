import { Typography } from "@mui/material";
import React from "react";

const FormTitle: React.FC = () => {
	return (
		<Typography textAlign={"center"}
			sx={{
				fontSize: (theme) => theme.typography.fontSize * 2,
				color: "bw.black",
				fontWeight: (theme) => theme.typography.fontWeightLight,
			}}
		>
			Create Appraisal
		</Typography>
	);
};

export default FormTitle;