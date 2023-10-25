import { useEffect } from "react";
import { Box } from "@mui/material";
import BaseLayout from "layout/BaseLayout";
import AppraisalList from "./components/AppraisalList";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setAppraisals } from "./ducks/appraisals.reducer";
import { getAppraisalsById } from "./ducks/appraisals.actions";

const Appraisal: React.FC = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!params.id) {
			dispatch(
				setAppraisals({
					appraisal_name: "",
					appraisal_year: 0,
					appraisal_type: "",
					supervisor_id: 0,
					appraisal_flow_id: 0,
					status: false,

					supervisor_name: "",

					filter: undefined,
					id: 0,

					appraisal_for_id: 0,
					selected_id: 0,
				})
			);
			return;
		}
		dispatch(getAppraisalsById(+params.id));
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
				<AppraisalList />
			</Box>
		</BaseLayout>
	);
};
export default Appraisal;
