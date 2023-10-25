import { MenuItem, Stack, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useAppDispatch, useAppSelect } from "hooks/reduxHook";

import { setAppraisals } from "../ducks/appraisals.reducer";
import { APPRAISAL_SELECT } from "../../AppraisalFlow/ducks/appraisalFlow.actions";

interface SelectTeamProps {
	initialValue?: number;
	disabled?: boolean;
}

const SelectTeam: React.FC<SelectTeamProps> = ({ initialValue }) => {
	const { payload: appraisals } = useAppSelect((state) => state.appraisals);
	const { selected_id, appraisal_for_id } = appraisals || { team_id: "" };
	const dispatch = useAppDispatch();

	const [selectedValue, setSelectedValue] = useState(initialValue !== undefined ? initialValue : selected_id);

	const onChange = (e: SelectChangeEvent<string | number>) => {
		const newSelectedValue = e.target.value as number;
		setSelectedValue(newSelectedValue);

		dispatch(
			setAppraisals({
				...appraisals,
				appraisal_for_id: newSelectedValue,
			})
		);
	};

	const getSelectedText = () => {
		const selectedItem = APPRAISAL_SELECT.find((item) => item.value === selectedValue);
		return selectedItem ? selectedItem.title : "";
	};

	return (
		<div>
			<Stack mt={10}>
				<Typography fontSize={(theme) => theme.typography.fontSize + 2}>
					{selectedValue ? "Selected: " + getSelectedText() : "Select please"}
				</Typography>

				<Select
					size="small"
					fullWidth
					sx={{
						boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
						marginTop: (theme) => theme.spacing(2),
						backgroundColor: "bw.white",
						borderRadius: (theme) => theme.shape.borderRadius * 0.25,
					}}
					IconComponent={KeyboardArrowDownIcon}
					displayEmpty
					onChange={onChange}
					value={appraisal_for_id}
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
