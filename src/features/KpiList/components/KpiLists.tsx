import * as React from "react";
import Box from "@mui/material/Box";
import Card from "./cards";
import { Stack } from "@mui/material";
import Search from "./Search";
import BaseLayout from "layout/BaseLayout";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { getKpi } from "../ducks/kpilist.actions";
import { useEffect } from "react";
import Loading from "components/loading";

const KpiLists: React.FC = () => {
	const dispatch = useAppDispatch();
	const { data, loading } = useAppSelect((state) => state.kpiList);

	useEffect(() => {
		dispatch(getKpi());
	});

	return (
		<>
			<BaseLayout>
				<Box>
					<Stack direction={{ xs: "column", sm: "row" }} mt={50} columnGap={19} ml={35} spacing={{ xs: 2 }} mb={6}>
						<Search />
						<Search />
						<Search />
					</Stack>

					{loading && data.length === 0 && (
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							minHeight="calc(10vh - 200px)" // Adjust this value as needed to center the loading spinner correctly
						>
							<Loading />
						</Box>
					)}

					<Stack direction="row" flexWrap="wrap" rowGap={15} columnGap={25} ml={67} mb={10} spacing={{ xs: 2 }}>
						{Array.isArray(data) && data.length > 0
							? data.map((kpi, index: number) => <Card key={index} kpi={kpi} />)
							: null}
					</Stack>
				</Box>
			</BaseLayout>
		</>
	);
};

export default KpiLists;
