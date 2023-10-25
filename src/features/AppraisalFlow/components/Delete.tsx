import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { APPRAISALFLOW } from "../ducks/appraisalFlow.actions";
import Link from "components/Link";

export type MeasureModalProps = {
	open: boolean;
	handleOnClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
	onDelete?: (deleted: number) => void;
	appraisalflow: APPRAISALFLOW;
};

const DeleteModal: React.FC<MeasureModalProps> = (props) => {
	const [deleted] = useState<number>(() => 0.0);
	const handleClose = () => {
		props.handleOnClose?.({}, "backdropClick");
	};
	const handleDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		if (props.onDelete && props.appraisalflow.id !== undefined) {
			props.onDelete(props.appraisalflow.id);
			props?.onDelete?.(deleted);
		}
	};

	return (
		<Dialog open={props.open} onClose={props.handleOnClose}>
			<DialogTitle
				sx={{
					textAlign: "center",
				}}
			>
				Warning!
			</DialogTitle>
			<DialogContent>
				<Stack>
					<Typography
						sx={{
							fontSize: "13px",
							direction: "row",
						}}
					>
						DO YOUR WANT TO DELETE THIS FLOW!
					</Typography>
				</Stack>
				<Stack alignItems="flex-end" mt={10} direction={{ sm: "row" }} spacing={{ xs: 10, md: 30 }} sx={{ mb: 4 }}>
					<Link
						to="#"
						onClick={handleDelete}
						type="submit"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 3,
							marginLeft: (theme) => theme.spacing(8),
							padding: (theme) => theme.spacing(2, 10),
							maxWidth: "30%",
							bgcolor: "primary.main",
							color: "bw.white",
						}}
					>
						Yes
					</Link>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						size="small"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 3,
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
