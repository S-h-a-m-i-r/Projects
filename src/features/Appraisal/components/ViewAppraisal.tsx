import { Box } from "@mui/material";
import Form from "./ViewForm";
import BaseLayout from "layout/BaseLayout";
import EmpList from "./EmpList";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { useParams } from "react-router-dom";
// import { getAppraisalById } from "../ducks/appraisals.actions";
import Loading from "components/loading";
import { useEffect } from "react";
import { setAppraisals } from "../ducks/appraisals.reducer";
import { getAppraisalById } from "features/AppraisalFlow/ducks/appraisalFlow.actions";
const ViewForm: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelect((state) => state.kpi);

	useEffect(() => {
		if (!params.id) {
			dispatch(
				setAppraisals({
					id: 0,
					appraisal_name: "",
					appraisal_year: 0,
					appraisal_type: "",
					supervisor_id: 0,
					appraisal_flow_id: 0,
					status: false,

					supervisor_name: "",

					filter: undefined,

					appraisal_for_id: 0,
					selected_id: 0,
				})
			);

			return;
		}

		dispatch(getAppraisalById(+params.id));
	}, [dispatch, params]);

	return (
		<BaseLayout>
			<Box
				sx={{
					display: "flex",
					minHeight: "100vh",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{loading ? <Loading /> : <Form updating={params?.id ? true : false} />}
				<EmpList />
			</Box>
		</BaseLayout>
	);
};

export default ViewForm;
