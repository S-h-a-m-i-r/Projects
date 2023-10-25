import { MenuItem, Stack, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisal } from "../ducks/appraisalFlow.reducer";
import { APPRAISAL_SELECT } from "../ducks/appraisalFlow.actions";

interface SelectTeamProps {
	initialValue?: number;
}

const SelectTeam: React.FC<SelectTeamProps> = ({ initialValue }) => {
	const { payload: appraisalflow } = useAppSelect((state) => state.appraisalFlow);
	const { assign_type_id } = appraisalflow || { assign_type_id: "" };
	const dispatch = useAppDispatch();

	const [selectedValue, setSelectedValue] = useState(initialValue !== undefined ? initialValue : assign_type_id);

	const onChange = (e: SelectChangeEvent<any>) => {
		const newSelectedValue = e.target.value;
		setSelectedValue(newSelectedValue);
		const AssignTypeName =
			newSelectedValue === 1 ? "Role" : newSelectedValue === 2 ? "Team" : newSelectedValue === 3 ? "Individual" : "";
		dispatch(setAppraisal({ ...appraisalflow, assign_type_id: newSelectedValue, assign_type_name: AssignTypeName }));
	};

	return (
		<div>
			<Stack mt={10}>
				<Typography fontSize={(theme) => theme.typography.fontSize + 2}>Select Type</Typography>

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
					placeholder="Select Type"
					value={selectedValue}
					MenuProps={{
						PaperProps: {
							style: {
								minHeight: 50,
							},
						},
					}}
				>
					{APPRAISAL_SELECT.map((idType) => (
						<MenuItem value={idType.value} key={idType.title}>
							{idType.title}
						</MenuItem>
					))}
				</Select>
			</Stack>
		</div>
	);
};

export default SelectTeam;
