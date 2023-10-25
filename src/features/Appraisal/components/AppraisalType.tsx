import { MenuItem, SelectChangeEvent, Stack, Typography } from "@mui/material";
import Select from "components/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "../ducks/appraisals.reducer";

const AppraisalType: React.FC = () => {
	const dispatch = useAppDispatch();
	const { payload: appraisals } = useAppSelect((state) => state.appraisals);

	const onChange = (e: SelectChangeEvent<any>) => {
		const newSelectedValue = e.target.value;

		dispatch(setAppraisals({ ...appraisals, appraisal_type: newSelectedValue }));
	};
	return (
		<Stack mt={10}>
			<Typography fontSize={(theme) => theme.typography.fontSize + 2}>Appraisal Type</Typography>
			<Select
				size="small"
				fullWidth
				sx={{
					boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
					marginTop: (theme) => theme.spacing(2),
					backgroundColor: "bw.white",
				}}
				IconComponent={KeyboardArrowDownIcon}
				displayEmpty
				placeholder="Select Type"
				onChange={onChange}
				value={appraisals.appraisal_type}
			>
				<MenuItem value={"Mid-Year"}>Mid-Year</MenuItem>
				<MenuItem value={"Annual"}>Yearly</MenuItem>
			</Select>
		</Stack>
	);
};
export default AppraisalType;
