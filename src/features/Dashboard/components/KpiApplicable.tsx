import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Typography } from "@mui/material";
import Input from "components/Input";
import AutoComplete from "components/AutoComplete";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { KPI_APPLICABLE_FOR } from "../ducks/dashboard.actions";
import { setKpi } from "../ducks/dashboard.reducer";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type OptionsType = {
	title: KPI_APPLICABLE_FOR;
	value: KPI_APPLICABLE_FOR;
};

const options: OptionsType[] = [
	{ title: "Team", value: "Team" },
	{ title: "Ceo", value: "Ceo" },
	{ title: "Engineer", value: "Engineer" },
	{ title: "Manager", value: "Manager" },
];

const KpiApplicable: React.FC = () => {
	const { kpi } = useAppSelect((state) => state.kpi);
	const dispatch = useAppDispatch();
	const values = options.filter((option) => kpi.applicable_for.includes(option.value));

	return (
		<Box mt={15}>
			<Typography mt={5} fontSize={(theme) => theme.typography.fontSize + 2}>
				KPI Applicable
			</Typography>
			<AutoComplete
				multiple
				id="checkboxes-tags-demo"
				options={options}
				value={values}
				onChange={(_, selectedOptions) => {
					const kpiApplicableFor = selectedOptions.map((option) => option.value);
					dispatch(setKpi({ ...kpi, applicable_for: kpiApplicableFor }));
				}}
				disableCloseOnSelect
				getOptionLabel={(option) => option.title}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ marginRight: 8 }} checked={selected} />
						{option.title}
					</li>
				)}
				sx={{
					backgroundColor: "bw.white",
					borderRadius: 2,
					boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
					marginTop: (theme) => theme.spacing(2),
				}}
				renderInput={(params) => <Input {...params} placeholder="Select" />}
			/>
		</Box>
	);
};

export default KpiApplicable;
