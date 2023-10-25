import React from "react";
import { Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { KPI, getKpi } from "../ducks/kpilist.actions";
import Link from "components/Link";
import { useAppDispatch } from "hooks/reduxHook";
export type MeasureModalProps = {
	open: boolean;
	handleOnClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
	onDelete?: (id?: number) => void;
	kpi: KPI;
	updateList?: () => void;
};

const DeleteModal: React.FC<MeasureModalProps> = (props) => {
	const handleClose = () => {
		props.handleOnClose?.({}, "backdropClick");
	};
	const dispatch = useAppDispatch();

	const handleDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		if (props.onDelete && props.kpi.id !== undefined) {
			props.onDelete(props.kpi.id);
		}
	};

	// dispatch(getKpi());
	if (props.updateList) {
		props.updateList(); // Trigger list update in parent component
	}

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
						Do you want to delete this KPI?
					</Typography>
				</Stack>
				<Stack alignItems="flex-end" mt={10} direction={{ sm: "row" }} spacing={{ xs: 10, md: 30 }} sx={{ mb: 4 }}>
					<Link
						to="#"
						onClick={handleDelete}
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
					<Link
						to="#"
						onClick={handleClose}
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 3,
							padding: (theme) => theme.spacing(2, 10),
							maxWidth: "30%",
							bgcolor: "primary.main",
							color: "bw.white",
						}}
					>
						No
					</Link>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
export default DeleteModal;
