import { Box, Divider, Typography, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import { APPRAISAL, getTodoById } from "../ducks/todo.actions";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { useParams, useSearchParams } from "react-router-dom";
interface MeasuredProps {
	updating?: boolean;
}
const Measured: React.FC<MeasuredProps> = (props) => {
	const [updatedData, setUpdatedData] = useState<APPRAISAL[] | undefined>(undefined);
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const temp = useSearchParams();
	console.log(temp);
	const { getAppraisalKpi } = useAppSelect((state) => state.todo);
	const { payload } = useAppSelect((state) => state.todo.getAppraisalKpi);
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
					Measured
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
						<br />
						<RadioGroup
							sx={{
								display: "flex",
								flexDirection: "row",
								paddingLeft: (theme) => theme.spacing(25),
							}}
						>
							<FormControlLabel value="1/5" control={<Radio />} label="1/5" />
							<FormControlLabel value="2/5" control={<Radio />} label="2/5" />
							<FormControlLabel value="3/5" control={<Radio />} label="3/5" />
							<FormControlLabel value="4/5" control={<Radio />} label="4/5" />
							<FormControlLabel value="5/5" control={<Radio />} label="5/5" />
						</RadioGroup>
					</Typography>
				))}
			</Box>
		</>
	);
};

export default Measured;
