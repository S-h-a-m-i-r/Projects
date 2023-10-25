import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Form from "./Form";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { useParams } from "react-router-dom";
import { getAppraisalById, getAppraisal } from "../ducks/appraisalFlow.actions";
import { setAppraisal } from "../ducks/appraisalFlow.reducer";
import Loading from "components/loading";

const CreateAppraisalFlowPage: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelect((state) => state.appraisalFlow);

	useEffect(() => {
		if (!params.id) {
			dispatch(
				setAppraisal({
					flow_name: "",
					assign_type_id: 0,
					assign_type_name: "",
					selected_assign_id: 0,
					selected_assign_name: "",
					created_by: 2,
					is_active: true,
					appraisal_type: "",
					flow_steps: [
						{
							step_name: "",
							step_order: 1,
							user_id: 0,
						},
					],
					map: undefined,
				})
			);

			return;
		}

		dispatch(getAppraisalById(+params.id));
	}, [dispatch, params]);

	useEffect(() => {
		dispatch(getAppraisal());
	}, [dispatch]);
	return (
		<>
			<Box>{loading ? <Loading /> : <Form updating={params?.id ? true : false} />}</Box>
		</>
	);
};

export default CreateAppraisalFlowPage;
