import { Stack, Typography } from "@mui/material";
import Input from "components/Input";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import React from "react";
import { setKpi } from "../ducks/dashboard.reducer";

const KpiDescription: React.FC = () => {
	const dispatch = useAppDispatch();
	const { kpi } = useAppSelect((state) => state.kpi);
	const handleKpiDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		dispatch(setKpi({ ...kpi, kpi_description: inputValue }));
	};
	return (
		<>
			<Stack mt={10}>
				<Typography fontSize={(theme) => theme.typography.fontSize + 2}>KPI DESCRIPTION</Typography>

				<Input
					multiline
					rows={6}
					fullWidth
					variant="outlined"
					placeholder="Type Here..."
					sx={{
						boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
					}}
					value={kpi.kpi_description}
					onChange={handleKpiDescChange}
					required
				/>
			</Stack>
		</>
	);
};

export default KpiDescription;
