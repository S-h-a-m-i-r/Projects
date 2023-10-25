import { Stack } from "@mui/material";
import BaseLayout from "layout/BaseLayout";
import * as React from "react";
import { Button } from "@mui/material";
import Appraisals from "./Appraisals";
import { useEffect } from "react";
import { APPRAISALFLOW, getAppraisal } from "../ducks/appraisalFlow.actions";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import Loading from "components/loading";
import { useNavigate } from "react-router-dom";

const AppraisalFlow: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { appraisalflow, loading } = useAppSelect((state) => state.appraisalFlow);

	useEffect(() => {
		dispatch(getAppraisal());
	}, [dispatch]);

	const handleAppraisal = () => {
		navigate("/createappraisal");
	};

	return (
		<BaseLayout>
			<Stack>
				<Button
					type="button"
					variant="contained"
					fullWidth
					size="medium"
					sx={{
						width: "15%",
						position: "absolute",
						right: "5%",
						mt: 10,
					}}
					onClick={handleAppraisal}
				>
					Create Flow
				</Button>
			</Stack>
			<Stack
				direction="row"
				flexWrap="wrap"
				rowGap={10}
				columnGap={5}
				ml={10}
				mb={10}
				mt={50}
				justifyContent="center"
				alignItems="center"
			>
				{loading && appraisalflow.length > 0 && <Loading />}
				{!loading && appraisalflow.length === 0 && <h3>No Appraisal to show</h3>}
				{!loading &&
					appraisalflow.length > 0 &&
					Array.isArray(appraisalflow) &&
					appraisalflow.map((appraisal: APPRAISALFLOW) => <Appraisals appraisalflow={appraisal} />)}
			</Stack>
		</BaseLayout>
	);
};

export default AppraisalFlow;
