import { Box, Divider, FormControlLabel, Radio, RadioGroup, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { APPRAISAL, TODO, getTodo, getTodoById } from "../ducks/todo.actions";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { useParams, useSearchParams } from "react-router-dom";

interface QuestionaireProps {
	updating?: boolean;
}
const Questionaire: React.FC<QuestionaireProps> = (props) => {
	const [updatedData, setUpdatedData] = useState<APPRAISAL[] | undefined>(undefined);
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const temp = useSearchParams();
	console.log(temp);
	const { getAppraisalKpi } = useAppSelect((state) => state.todo);
	const { payload } = useAppSelect((state) => state.todo.getAppraisalKpi);
	console.log(id);

	useEffect(() => {
		if (id) {
			dispatch(getTodoById(id));
			const Todo =
				getAppraisalKpi.payload && Array.isArray(getAppraisalKpi.payload)
					? getAppraisalKpi.payload.filter((ele) => ele.appraisal_id === Number(id))
					: [];
			setUpdatedData(Todo);

			// .then(() => {
			// 	const Todo = getAppraisalKpi.payload.filter((ele) => ele.id === Number(id));
			// 	setUpdatedData(Todo);
			// })
			// .catch((error) => {
			// 	console.error("Error fetching todo:", error);
			// });
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
					Questionnaire
				</Typography>
				<Divider orientation="horizontal" flexItem />

				{updatedData?.[0]?.kpi?.statements?.map((statement, index) => (
					<Typography
						key={statement.id}
						sx={{
							margin: (theme) => theme.spacing(15),
						}}
					>
						{`${index + 1}. ${statement.statement}`}
						<RadioGroup
							sx={{
								display: "flex",
								flexDirection: "row",
								paddingLeft: (theme) => theme.spacing(5),
							}}
						>
							<FormControlLabel value="Yes" control={<Radio />} label="Yes" />
							<FormControlLabel value="No" control={<Radio />} label="No" />
						</RadioGroup>
					</Typography>
				))}
				<Stack pl={10} pt={10}>
					<Typography
						textAlign={"center"}
						mb={10}
						sx={{
							fontWeight: (theme) => theme.typography.fontWeightRegular,
							fontSize: (theme) => theme.typography.fontSize,
							fontFamily: (theme) => theme.typography.fontFamily,
							color: "bw.black",
						}}
					></Typography>
				</Stack>
			</Box>
		</>
	);
};

export default Questionaire;
