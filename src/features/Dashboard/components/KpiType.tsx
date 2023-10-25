import { Stack, Typography } from "@mui/material";
import RoundedButton from "components/RoundedButton";
import React, { useState } from "react";
import MeasureModal from "./MeasureModal";
import ObservatoryModel from "./ObservatoryModel";
import FeedBackModel from "./FeedBackModel";
import Questionaire from "./Questionaire";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { KPI_TYPE, QUESTIONAIRE } from "../ducks/dashboard.actions";
import { setKpi } from "../ducks/dashboard.reducer";

const KpiType: React.FC = () => {
	const { kpi } = useAppSelect((state) => state.kpi);
	const { kpi_type } = kpi;

	const dispatch = useAppDispatch();

	const [showMeasuredModal, setMeasuredModal] = useState<boolean>(() => false);
	const [showObservatoryModel, setObservatoryModel] = useState<boolean>(() => false);
	const [showFeedBackModel, setFeedBackModel] = useState<boolean>(() => false);
	const [showQuestionaireModel, setQuestionaireModel] = useState<boolean>(() => false);

	const onSelectKpiType = (kpiType: KPI_TYPE) => {
		if (kpiType === "Measured" || kpiType === "Questionnaire") {
			const statements = [{ weightage: 0, statement: "" }] satisfies QUESTIONAIRE[];
			dispatch(setKpi({ ...kpi, kpi_type: kpiType, statements, statement: "" }));
		} else {
			dispatch(setKpi({ ...kpi, kpi_type: kpiType, statements: [], statement: "" }));
		}
	};

	return (
		<>
			<Stack mt={15}>
				<Typography fontSize={(theme) => theme.typography.fontSize + 2}>KPI Type</Typography>
			</Stack>
			<Stack mt={8} justifyContent="space-between" rowGap={10} direction="row" flexWrap="wrap">
				<RoundedButton
					active={kpi_type === "Measured"}
					onClick={() => {
						setMeasuredModal(true);
						onSelectKpiType("Measured");
					}}
					variant="contained"
				>
					Measured
				</RoundedButton>
				<RoundedButton
					active={kpi_type === "Observatory"}
					onClick={() => {
						setObservatoryModel(true);
						onSelectKpiType("Observatory");
					}}
					variant="contained"
				>
					Observatory
				</RoundedButton>
				<RoundedButton
					active={kpi_type === "Questionnaire"}
					onClick={() => {
						setQuestionaireModel(true);
						onSelectKpiType("Questionnaire");
					}}
					variant="contained"
				>
					Questionnaire
				</RoundedButton>
				<RoundedButton
					active={kpi_type === "Feedback"}
					onClick={() => {
						setFeedBackModel(true);
						onSelectKpiType("Feedback");
					}}
					variant="contained"
				>
					Feedback
				</RoundedButton>
			</Stack>
			<MeasureModal open={showMeasuredModal} handleOnClose={() => setMeasuredModal(false)} />
			<ObservatoryModel open={showObservatoryModel} handleOnClose={() => setObservatoryModel(false)} />
			<FeedBackModel open={showFeedBackModel} handleOnClose={() => setFeedBackModel(false)} />
			<Questionaire open={showQuestionaireModel} handleOnClose={() => setQuestionaireModel(false)} />
		</>
	);
};

export default KpiType;
