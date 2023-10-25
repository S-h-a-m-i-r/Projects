import { Typography } from "@mui/material";
import Input from "components/Input";
import React from "react";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setKpi } from "../ducks/dashboard.reducer";

const KpiWeight: React.FC = () => {
	const dispatch = useAppDispatch();
	const { kpi } = useAppSelect((state) => state.kpi);

	const handleKpiWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.valueAsNumber;

		dispatch(setKpi({ ...kpi, kpi_weight: inputValue }));
	};

	return (
		<>
			<Typography mt={15} fontSize={(theme) => theme.typography.fontSize + 2}>
				KPI Weight
			</Typography>
			<Input
				size="medium"
				type="number"
				fullWidth
				placeholder="eg 0,1,2"
				inputProps={{ min: 0 }}
				value={kpi.kpi_weight}
				onChange={handleKpiWeightChange}
				required
				sx={{
					backgroundColor: "bw.white",
				}}
			/>
		</>
	);
};

export default KpiWeight;
