import { useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisal } from "../ducks/appraisalFlow.reducer";
import { updateAppraisal } from "../ducks/appraisalFlow.actions"; // Import your API function for updating appraisal

const ActiveButton = () => {
	const [activate, setActivate] = useState(true);
	const dispatch = useAppDispatch();
	const { payload: appraisalflow } = useAppSelect((state) => state.appraisalFlow);

	const handleClick = async () => {
		const updatedAppraisal = {
			...appraisalflow,
			is_active: !activate,
		};
		dispatch(setAppraisal(updatedAppraisal));
		setActivate(!activate);

		try {
			await updateAppraisal();
			console.log("Response sent to the server");
		} catch (error) {
			console.error("Error sending response to the server", error);
		}
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleClick}
				sx={{
					mb: 10,
					width: "5px",
					height: "17px",
					fontSize: "9px",
					"&.MuiButton-containedPrimary": {
						backgroundColor: activate ? "limegreen" : "",
						color: "white",
					},
					"&.MuiButton-containedSecondary": {
						backgroundColor: activate ? "#D3D3D3" : "#D3D3D3",
						color: "black",
					},
				}}
				color={activate ? "primary" : "secondary"}
			>
				{activate ? "Active" : "Deactivate"}
			</Button>
		</>
	);
};

export default ActiveButton;
