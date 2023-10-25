import { Typography } from "@mui/material";
import Input from "components/Input";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import React from "react";
import { setKpi } from "../ducks/dashboard.reducer";
import { brown } from "@mui/material/colors";

const KpiName: React.FC = () => {
	const dispatch = useAppDispatch();
	const { kpi } = useAppSelect((state) => state.kpi);

	const handleKpiNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		dispatch(setKpi({ ...kpi, kpi_name: inputValue }));
	};

	return (
		<>
			<Typography fontSize={(theme) => theme.typography.fontSize + 2}>KPI Name</Typography>
			<Input
				size="medium"
				fullWidth
				placeholder="Enter KPI Name"
				value={kpi.kpi_name}
				onChange={handleKpiNameChange}
				required
				sx={{
					backgroundColor: "bw.white",
				}}
			/>
		</>
	);
};

export default KpiName;
