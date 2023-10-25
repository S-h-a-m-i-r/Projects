import { Box } from "@mui/material";
import Form from "./Form";
import BaseLayout from "layout/BaseLayout";

import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { getAppraisalsById, getAppraisalList } from "../ducks/appraisals.actions";
import { useParams } from "react-router-dom";

import Loading from "components/loading";
import { useEffect } from "react";
import { setAppraisals } from "../ducks/appraisals.reducer";
const Appraisal: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelect((state) => state.appraisals);

	useEffect(() => {
		if (!params.id) {
			dispatch(
				setAppraisals({
					id: 0,
					appraisal_name: "",
					appraisal_year: 0,
					appraisal_type: "",
					supervisor_id: 0,
					supervisor_name: "",
					appraisal_flow_id: 0,
					status: false,

					filter: undefined,

					appraisal_for_id: 0,
					selected_id: 0,
				})
			);

			return;
		}

		dispatch(getAppraisalsById(+params.id));
	}, [dispatch, params]);

	useEffect(() => {
		dispatch(getAppraisalList());
	}, [dispatch]);

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
			</Box>
		</BaseLayout>
	);
};

export default Appraisal;
