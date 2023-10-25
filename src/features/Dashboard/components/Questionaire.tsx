import React, { useState } from "react";
import { Button, IconButton, Dialog, DialogContent, DialogTitle, Stack, Box } from "@mui/material";
import Input from "components/Input";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { QUESTIONAIRE } from "../ducks/dashboard.actions";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setKpi } from "../ducks/dashboard.reducer";

export type QuestionnaireProps = {
	open: boolean;
	handleOnClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
	onSubmit?: (Questionnaire: Array<QUESTIONAIRE>) => void;
};

const INITIAL_VALUE = { statement: "", weightage: 0 };

const Questionnaire: React.FC<QuestionnaireProps> = (props) => {
	const dispatch = useAppDispatch();
	const { kpi } = useAppSelect((state) => state.kpi);

	const [fields, setFields] = useState<Array<QUESTIONAIRE>>(() => kpi.statements || [INITIAL_VALUE]);
	const [error, setError] = useState<string>("");

	const addInput = () => {
		setFields([...fields, INITIAL_VALUE]);
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// check if any input fields are empty
		const isEmpty = fields.some((field) => field.statement.trim() === "");
		if (isEmpty) {
			return setError("Please fill in all fields");
		}

		// clear error message and submit form
		setError("");

		const fieldsWithNumbers = fields.map((field) => ({
			...field,
			weightage: field.weightage,
		}));
		props?.onSubmit?.(fields);

		// set kpi to global redux state
		dispatch(setKpi({ ...kpi, statements: fieldsWithNumbers }));
		props?.handleOnClose?.({}, "backdropClick");
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof typeof INITIAL_VALUE, index: number) => {
		const questions = [...fields];
		const questionaire: QUESTIONAIRE | any = { ...questions[index] };

		if (fieldName === "weightage") {
			const value = e.target.value;
			const isStringNumber = /^\d+(\.\d+)?$/.test(value);

			if (isStringNumber) {
				questionaire[fieldName] = parseFloat(value);
			} else {
				questionaire[fieldName] = 0;
			}
		} else {
			questionaire[fieldName] = e.target.value;
		}

		questions[index] = questionaire;
		setFields(questions);
	};

	return (
		<Dialog open={props.open} onClose={props.handleOnClose}>
			<DialogTitle>Questionnaire</DialogTitle>
			<DialogContent>
				<Stack mt={5}>
					{fields.map((field, index) => (
						<Box
							key={index}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mt: 2,
							}}
						>
							<Input
								variant="outlined"
								placeholder="Type Here..."
								required
								value={field.statement}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, "statement", index)}
								sx={{
									width: (theme) => theme.spacing(170),
									boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
								}}
							/>
							<Input
								variant="outlined"
								placeholder="e.g 1,2,3"
								value={field.weightage}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, "weightage", index)}
								sx={{
									width: (theme) => theme.spacing(44),
									boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
									marginLeft: (theme) => theme.spacing(4),
								}}
								required
							/>
							<IconButton
								onClick={() => {
									if (fields.length <= 1) return;

									const newQue = fields.filter((f) => f !== field);
									setFields(newQue);
								}}
							>
								<CancelIcon color="error" sx={{ fontSize: (theme) => theme.typography.fontSize * 3 }} />
							</IconButton>
						</Box>
					))}
					{error && <Box sx={{ color: "error.main", mt: 2 }}>{error}</Box>}

					<Button
						onClick={addInput}
						type="submit"
						variant="contained"
						fullWidth
						size="large"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 0.1,
							maxWidth: "35%",
							backgroundColor: "bw.white",
							color: "bw.black",
							mt: 10,
							"&:hover": {
								color: "bw.white",
							},
						}}
					>
						<AddCircleOutlineOutlinedIcon sx={{ marginRight: (theme) => theme.spacing(5) }} />
						Add Question
					</Button>
					<Box display="flex" justifyContent="flex-end" mt={2}>
						<Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 2 }}>
							Submit
						</Button>
					</Box>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
export default Questionnaire;
