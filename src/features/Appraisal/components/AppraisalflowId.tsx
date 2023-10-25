import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Typography } from "@mui/material";
import Input from "components/Input";
import AutoComplete from "components/AutoComplete";
import { APPRAISALFLOW, getAppraisal } from "features/AppraisalFlow/ducks/appraisalFlow.actions";
import { AutocompleteChangeReason, AutocompleteChangeDetails } from "@mui/material/Autocomplete";

import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "../ducks/appraisals.reducer";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface AppraisalFlowIDProps {
	appraisalflows: APPRAISALFLOW[];
}

const AppraisalFlowID: React.FC<AppraisalFlowIDProps> = ({ appraisalflows }) => {
	const dispatch = useAppDispatch();
	const { payload: appraisals } = useAppSelect((state) => state.appraisals);
	const { appraisal_flow_id } = useAppSelect((state) => state.appraisals.payload);
	const [inputValue, setInputValue] = useState<string | number>("");
	useEffect(() => {
		dispatch(getAppraisal());
	}, [dispatch]);

	const OnChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: APPRAISALFLOW | null,
		reason: AutocompleteChangeReason,
		details?: AutocompleteChangeDetails<APPRAISALFLOW> | undefined
	) => {
		if (value) {
			const selectedValue = Number(value.id);
			setInputValue(selectedValue);

			dispatch(
				setAppraisals({
					...appraisals,
					appraisal_flow_id: selectedValue,
				})
			);
		}
	};

	return (
		<Box mt={15}>
			<Typography mt={5} fontSize={(theme) => theme.typography.fontSize + 2}>
				Appraisal Flow
			</Typography>
			<AutoComplete
				size="small"
				id="checkboxes-tags-demo"
				options={appraisalflows}
				value={appraisalflows.find((flow) => Number(flow.id) === appraisal_flow_id) || null}
				disableCloseOnSelect
				getOptionLabel={(appraisalflow) => appraisalflow.flow_name}
				renderOption={(props, appraisalflow, { selected }) => (
					<li {...props}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ marginRight: 8 }} checked={selected} />
						{appraisalflow.flow_name}
					</li>
				)}
				sx={{
					backgroundColor: "bw.white",
					borderRadius: 2,
					boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
					marginTop: (theme) => theme.spacing(2),
				}}
				onChange={OnChange}
				renderInput={(params) => <Input {...params} placeholder="Select" />}
				disabled={appraisalflows.length === 0}
			/>
		</Box>
	);
};

export default AppraisalFlowID;
