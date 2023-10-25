import { Typography } from "@mui/material";
import React from "react";
import Input from "components/Input";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "../ducks/appraisals.reducer";

const AppraisalYear: React.FC = () => {
	const dispatch = useAppDispatch();
	const { payload: appraisals } = useAppSelect((state) => state.appraisals);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = Number(event.target.value);
		dispatch(
			setAppraisals({
				...appraisals,
				appraisal_year: inputValue,
			})
		);
	};

	return (
		<>
			<Typography
				mt={8}
				sx={{
					fontSize: (theme) => theme.typography.fontSize + 2,
					fontWeight: (theme) => theme.typography.fontWeightRegular,
					fontFamily: (theme) => theme.typography.fontFamily,
				}}
			>
				Appraisal Year
			</Typography>
			<Input
				size="small"
				fullWidth
				placeholder="YYYY"
				value={appraisals.appraisal_year}
				onChange={handleNameChange}
				sx={{
					backgroundColor: "bw.white",
				}}
			/>
		</>
	);
};

export default AppraisalYear;
