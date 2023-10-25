import { MenuItem, Stack, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisal } from "../ducks/appraisalFlow.reducer";
import { APPRAISALTYPE_SELECT } from "../ducks/appraisalFlow.actions";

interface AppraisalTypeProps {
	initialValue?: string;
}

const AppraisalType: React.FC<AppraisalTypeProps> = ({ initialValue }) => {
	const { payload: appraisalflow } = useAppSelect((state) => state.appraisalFlow);
	const dispatch = useAppDispatch();

	const onChange = (e: SelectChangeEvent<any>) => {
		const newSelectedValue = e.target.value;
		dispatch(setAppraisal({ ...appraisalflow, appraisal_type: newSelectedValue }));
	};

	return (
		<div>
			<Stack mt={6}>
				<Typography fontSize={(theme) => theme.typography.fontSize + 2}>Appraisal Type</Typography>

				<Select
					size="small"
					fullWidth
					sx={{
						boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
						marginTop: (theme) => theme.spacing(2),
						backgroundColor: "white",
						borderRadius: (theme) => theme.shape.borderRadius * 0.25,
					}}
					IconComponent={KeyboardArrowDownIcon}
					displayEmpty
					onChange={onChange}
					value={appraisalflow.appraisal_type}
				>
					<MenuItem value="" disabled>
						Select Type
					</MenuItem>
					{APPRAISALTYPE_SELECT.map((type) => (
						<MenuItem value={type.value} key={type.title}>
							{type.title}
						</MenuItem>
					))}
				</Select>
			</Stack>
		</div>
	);
};

export default AppraisalType;
