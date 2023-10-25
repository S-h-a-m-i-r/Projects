import React from "react";
import { MenuItem, SelectChangeEvent, Stack, Typography } from "@mui/material";
import Select from "components/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KPI_SELECT } from "../ducks/dashboard.actions";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setKpi } from "../ducks/dashboard.reducer";
const KpiAssignType: React.FC = () => {
	const { kpi } = useAppSelect((state) => state.kpi);
	const { assign_type_id } = kpi;
	const dispatch = useAppDispatch();
	const onChange = (e: SelectChangeEvent<any>) => {
		const selectedValue = e.target.value;
		const selectedKpiType = KPI_SELECT.find((kpiType) => kpiType.value === selectedValue);
		const selectedTitle = selectedKpiType ? selectedKpiType.title : "";
		dispatch(setKpi({ ...kpi, assign_type_id: selectedValue, assign_type_name: selectedTitle }));
	};
	return (
		<Stack mt={10}>
			<Typography fontSize={(theme) => theme.typography.fontSize + 2}>KPI Assign Type</Typography>
			<Select
				fullWidth
				sx={{
					boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
					marginTop: (theme) => theme.spacing(2),
				}}
				IconComponent={KeyboardArrowDownIcon}
				onChange={onChange}
				placeholder="Select Type"
				value={assign_type_id}
			>
				{KPI_SELECT.map((kpiType) => (
					<MenuItem value={kpiType.value} key={kpiType.title}>
						{kpiType.title}
					</MenuItem>
				))}
			</Select>
		</Stack>
	);
};
export default KpiAssignType;
