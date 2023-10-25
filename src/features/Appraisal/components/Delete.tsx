import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import Link from "components/Link";
import { APPRAISAL, getAppraisalList } from "libs/redux/appraisals/appraisal.action";
import { useAppDispatch } from "hooks/reduxHook";
import { delAppraisalList } from "../../../libs/redux/appraisals/appraisal.action";

export type MeasureModalProps = {
	open: boolean;
	handleOnClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
	onDelete?: () => void;
	appraisal: APPRAISAL;
	updateList?: () => void; // Callback function to update the list
};

const DeleteModal: React.FC<MeasureModalProps> = (props) => {
	const handleClose = () => {
		props.handleOnClose?.({}, "backdropClick");
	};

	const dispatch = useAppDispatch();

	const onDelete = async (e: React.FormEvent) => {
		e.preventDefault();
		props?.onDelete?.();

		const appraisalId = props.appraisal.id || 0;
		await dispatch(delAppraisalList(appraisalId));
		dispatch(getAppraisalList());
		if (props.updateList) {
			props.updateList(); // Trigger list update in parent component
		}
	};

	return (
		<Dialog open={props.open} onClose={props.handleOnClose}>
			<DialogTitle sx={{ textAlign: "center" }}>Warning!</DialogTitle>
			<DialogContent>
				<Stack>
					<Typography sx={{ fontSize: "13px", direction: "row" }}>Do you want to delete this appraisal?</Typography>
				</Stack>
				<Stack
					alignItems="center"
					mt={10}
					direction={{ sm: "row" }}
					spacing={{ xs: 10, md: 38 }}
					sx={{ mb: 4, alignItems: "center" }}
				>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						size="small"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 3,
							marginLeft: (theme) => theme.spacing(8),
							maxWidth: "30%",
						}}
						onClick={onDelete}
					>
						Yes
					</Button>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						size="small"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 3,
							marginLeft: (theme) => theme.spacing(8),
							maxWidth: "30%",
						}}
						onClick={handleClose}
					>
						No
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
