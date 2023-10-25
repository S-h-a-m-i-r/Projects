import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AutocompleteChangeReason, Box, Typography } from "@mui/material";
import Input from "components/Input";
import AutoComplete from "components/AutoComplete";
import { KPI, getKpi } from "features/KpiList/ducks/kpilist.actions";

import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "../ducks/appraisals.reducer";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface AppraisalKpiProps {
	kpis: KPI[];
	updating?: boolean;
}

const AppraisalKpi: React.FC<AppraisalKpiProps> = ({ kpis }) => {
	const { payload: appraisals } = useAppSelect((state) => state.appraisals);
	// const { appraisal_kpis } = useAppSelect((state) => state.appraisals.payload);

	const dispatch = useAppDispatch();
	const { selected_id } = useAppSelect((state) => state.appraisals.payload);
	useEffect(() => {
		dispatch(getKpi());
	}, [dispatch]);

	const handleSelectionChange = (event: React.ChangeEvent<{}>, value: KPI[], reason: AutocompleteChangeReason) => {
		console.log("CHECK", value);
		const filteredValue = value?.map((kpi) => ({
			kpiId: kpi?.id,
		}));
		console.log("NEW", filteredValue);
		dispatch(
			setAppraisals({
				...appraisals,
				// appraisal_kpis: value,
			})
		);
	};

	return (
		<Box mt={15}>
			<Typography mt={5} fontSize={(theme) => theme.typography.fontSize + 2}>
				Appraisal Kpi
			</Typography>

			<AutoComplete
				size="small"
				multiple
				id="checkboxes-tags-demo"
				options={kpis.filter((kpi) => kpi.selected_assign_id === selected_id)}
				// value={appraisal_kpis}
				onChange={handleSelectionChange}
				disableCloseOnSelect
				getOptionLabel={(data) => data.kpi_name}
				renderOption={(props, data, { selected }) => (
					<li {...props}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ marginRight: 8 }} checked={selected} />
						{data.kpi_name}
					</li>
				)}
				sx={{
					backgroundColor: "bw.white",
					borderRadius: 2,
					boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
					marginTop: (theme) => theme.spacing(2),
				}}
				renderInput={(params) => <Input {...params} placeholder="Select" />}
				disabled={kpis.length === 0}
			/>
		</Box>
	);
};

export default AppraisalKpi;
