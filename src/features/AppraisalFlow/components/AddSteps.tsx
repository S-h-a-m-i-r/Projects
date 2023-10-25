import { useState, useEffect } from "react";
import { Button, IconButton, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import Input from "components/Input";
import React from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { STEP } from "../ducks/appraisalFlow.actions";
import { setAppraisal } from "../ducks/appraisalFlow.reducer";
import CancelIcon from "@mui/icons-material/Cancel";
import { getEmployeeList } from "libs/redux/employees/employees.actions";
import { Employee } from "libs/redux/employees/employees.state";

type AddStepProps = { initialValue?: STEP[] };

const AddSteps: React.FC<AddStepProps> = ({ initialValue }) => {
	const dispatch = useAppDispatch();
	const { payload } = useAppSelect((state) => state.appraisalFlow);
	const { emplist } = useAppSelect((state) => state.employeesList);

	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	const [fields, setFields] = useState<STEP[]>(payload.flow_steps || [initialValue]);

	useEffect(() => {
		dispatch(getEmployeeList());
		if (payload.flow_steps) {
			setFields(payload.flow_steps);
		}
	}, [dispatch, payload.flow_steps]);

	const addInput = () => {
		const nextStepOrder = fields.length + 1;

		const newStep: STEP = {
			step_order: nextStepOrder,
			step_name: "",
			user_id: 0,
		};

		setFields([...fields, newStep]);
	};

	return (
		<form>
			{fields.map((field, index) => (
				<Stack key={index} direction="row" spacing={10} sx={{ mb: 4 }}>
					<Input type="number" size="small" value={field.step_order} sx={{ width: "50%" }} />
					<Select
						size="small"
						fullWidth
						sx={{
							width: "50%",
							boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
							backgroundColor: "white",
							borderRadius: (theme) => theme.shape.borderRadius * 0.25,
						}}
						value={field.step_name}
						onChange={(e: SelectChangeEvent<string | number>) => {
							const newValue = e.target.value as string;
							const updatedValues = [...selectedValues];
							updatedValues[index] = newValue;
							setSelectedValues(updatedValues);
							const updatedFields = [...fields];
							updatedFields[index] = {
								...updatedFields[index],
								step_name: newValue,
								user_id: emplist.empdetails.find((employee) => employee.name === newValue)?.employeeId ?? 0,
							};
							setFields(updatedFields);
							dispatch(setAppraisal({ ...payload, flow_steps: updatedFields }));
						}}
					>
						{emplist.empdetails.map((employee: Employee) => (
							<MenuItem key={employee.name} value={employee.name}>
								{employee.name}
							</MenuItem>
						))}
					</Select>

					<IconButton
						onClick={() => {
							const updatedFields = [...fields];
							updatedFields.splice(index, 1);
							setFields(updatedFields);
							dispatch(setAppraisal({ ...payload, flow_steps: updatedFields }));
						}}
					>
						<CancelIcon color="error" sx={{ fontSize: (theme) => theme.typography.fontSize * 2 }} />
					</IconButton>
				</Stack>
			))}
			<Button
				type="button"
				variant="contained"
				fullWidth
				size="large"
				sx={{
					marginTop: (theme) => theme.spacing(10),
					maxWidth: "30%",
					backgroundColor: "white",
					color: "black",
					"&:hover": {
						backgroundColor: "#ED1C24",
						color: "white",
					},
				}}
				onClick={addInput}
			>
				<Stack direction="row" spacing={7} alignItems="center" justifyContent="flex-start ">
					<ControlPointIcon style={{ marginLeft: "-25px" }} />
					<span style={{ display: "flex", alignItems: "center" }}>Add Step</span>
				</Stack>
			</Button>
		</form>
	);
};

export default AddSteps;
