import React from "react";
import { Typography } from "@mui/material";
import Input from "components/Input";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisal } from "../ducks/appraisalFlow.reducer";

const Name = ({ initialValue }: { initialValue?: string }) => {
	const dispatch = useAppDispatch();
	const { payload } = useAppSelect((state) => state.appraisalFlow);
	const handleFlowNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newInputValue = event.target.value;
		dispatch(setAppraisal({ ...payload, flow_name: newInputValue }));
		console.log(newInputValue);
	};

	return (
		<>
			<Typography fontSize={(theme) => theme.typography.fontSize + 2}>Flow Name</Typography>
			<Input
				size="small"
				placeholder="Enter Flow Name"
				required
				sx={{
					width: (theme) => theme.spacing(250),
					backgroundColor: "bw.white",
				}}
				value={payload.flow_name}
				onChange={handleFlowNameChange}
			/>
		</>
	);
};

export default Name;
