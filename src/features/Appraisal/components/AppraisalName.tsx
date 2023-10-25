import { Typography } from "@mui/material";
import React from "react";
import Input from "components/Input";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "../ducks/appraisals.reducer";

interface AppraisalNameProps {
	initialValue?: string;
	disabled?: boolean;
}
const AppraisalName: React.FC<AppraisalNameProps> = ({ initialValue }: { initialValue?: string }) => {
	const dispatch = useAppDispatch();

	const { payload: appraisals } = useAppSelect((state) => state.appraisals);

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newInputValue = event.target.value;
		dispatch(
			setAppraisals({
				...appraisals,
				appraisal_name: newInputValue,
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
				Appraisal Name
			</Typography>
			<Input
				size="small"
				fullWidth
				placeholder="Name"
				value={appraisals.appraisal_name}
				onChange={handleNameChange}
				sx={{
					backgroundColor: "bw.white",
				}}
			/>
		</>
	);
};

export default AppraisalName;
