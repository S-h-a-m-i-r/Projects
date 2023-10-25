import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Input from "components/Input";
import { APPRAISAL, getTodoById } from "../ducks/todo.actions";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { useParams, useSearchParams } from "react-router-dom";
import { gettodo } from "../ducks/todo.reducer";

interface FeedbackProps {
	updating?: boolean;
}

const Feedback: React.FC<FeedbackProps> = (props) => {
	const [updatedData, setUpdatedData] = useState<APPRAISAL[] | undefined>(undefined);
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const temp = useSearchParams();
	console.log(temp);
	const { getAppraisalKpi } = useAppSelect((state) => state.todo);
	const { payload } = useAppSelect((state) => state.todo.getAppraisalKpi);
	console.log(id);
	const { createScore } = useAppSelect((state) => state.todo);
	// const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const inputValue = event.target.value;
	// 	dispatch(gettodo({ ...createScore, text_answer: inputValue }));
	// };
	useEffect(() => {
		if (id) {
			dispatch(getTodoById(id));
			const Todo =
				getAppraisalKpi.payload && Array.isArray(getAppraisalKpi.payload)
					? getAppraisalKpi.payload.filter((ele) => ele.appraisal_id === Number(id))
					: [];
			setUpdatedData(Todo);
		}
	}, []);

	return (
		<>
			<Box
				mt={10}
				sx={{
					borderWidth: 1,
					borderColor: "bw.blackLightest",
					borderStyle: "solid",
					width: "42vw",
					boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
					borderRadius: (theme) => theme.shape.borderRadius * 0.11,
					bgcolor: "bw.white",
				}}
			>
				<Typography
					pl={10}
					pt={5}
					pb={3}
					sx={{
						fontWeight: (theme) => theme.typography.fontWeightLight,
						fontSize: (theme) => theme.typography.fontSize * 1.6,
						fontFamily: (theme) => theme.typography.fontFamily,
					}}
				>
					Feedback
				</Typography>

				<Divider orientation="horizontal" flexItem />
				<Stack ml={10}>
					{payload.map((e) => (
						<React.Fragment key={e.kpi.statement}>
							{e.kpi.statement && (
								<>
									<Typography
										sx={{
											margin: (theme) => theme.spacing(5),
											fontSize: (theme) => theme.typography.fontSize * 1.2,
										}}
									>
										{e.kpi.statement}
										<br />
									</Typography>
									<Input
										multiline
										rows={6}
										variant="outlined"
										placeholder="Type Here..."
										sx={{
											width: "96%",
											boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
											margin: (theme) => theme.spacing(5, 5, 5, 5),
										}}
										required
									/>
								</>
							)}
						</React.Fragment>
					))}
				</Stack>
			</Box>
		</>
	);
};

export default Feedback;
