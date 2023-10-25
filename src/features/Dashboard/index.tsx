import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import BaseLayout from "layout/BaseLayout";
import Form from "./components/Form";
import { useEffect } from "react";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import Loading from "components/loading";
import { getKpiById } from "./ducks/dashboard.actions";
import { setKpi } from "./ducks/dashboard.reducer";
import { getEmployeeList } from "libs/redux/employees/employees.actions";

const Dashboard: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelect((state) => state.kpi);

	// Get kpi by id
	useEffect(() => {
		/**
		 * If there is no ID in the route that means this is a create case,
		 * and reset the kpi form if there is any data
		 */
		if (!params.id) {
			dispatch(
				setKpi({
					kpi_name: "",
					assign_type_id: 1,
					assign_type_name: "",
					selected_assign_id: 180,
					selected_assign_name: "",
					applicable_for: [],
					kpi_type: "",

					statement: "",
					statements: [
						{
							statement: "",
							weightage: 0,
						},
					],
					kpi_description: "",
					kpi_weight: 0,
				})
			);

			return;
		}

		dispatch(getKpiById(+params.id));
	}, [dispatch, params]);

	// useEffect(() => {
	// 	/**
	// 	 * Example Code
	// 	 * NOTE: dispatch getEmployeeList action in its required place.
	// 	 * this is just an example for you
	// 	 */
	// 	dispatch(getEmployeeList());
	// }, [dispatch]);

	return (
		<BaseLayout>
			<Box
				mt={30}
				mb={30}
				sx={{
					display: "flex",
					minHeight: "100vh",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{loading ? <Loading /> : <Form updating={params?.id ? true : false} />}
			</Box>
		</BaseLayout>
	);
};

export default Dashboard;
