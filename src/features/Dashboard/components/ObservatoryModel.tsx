import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import Input from "components/Input";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setKpi } from "../ducks/dashboard.reducer";

export type ObservatoryModelProps = {
	open: boolean;
	handleOnClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
	onSubmit?: (observed: string) => void;
};

const ObservatoryModel: React.FC<ObservatoryModelProps> = (props) => {
	const dispatch = useAppDispatch();
	const { kpi } = useAppSelect((state) => state.kpi);
	const { statement } = kpi;

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!statement) {
			return;
		}

		props?.onSubmit?.(statement);
		props?.handleOnClose?.({}, "backdropClick");
	};

	return (
		<Dialog onSubmit={onSubmit} open={props.open} onClose={props.handleOnClose}>
			<DialogTitle>observatory</DialogTitle>
			<DialogContent>
				<Input
					variant="outlined"
					placeholder="Type Here..."
					sx={{
						width: (theme) => theme.spacing(235),
						marginLeft: (theme) => theme.spacing(5),
						marginRight: (theme) => theme.spacing(5),
						boxShadow: (theme) => theme.palette.advancedShadow.basicShadow,
					}}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setKpi({ ...kpi, statement: e.target.value }))}
					required
				/>
				<Stack alignItems="flex-end" mt={40}>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						size="large"
						sx={{
							borderRadius: (theme) => theme.shape.borderRadius * 3,
							maxWidth: "30%",
						}}
						onClick={onSubmit}
					>
						Submit
					</Button>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
export default ObservatoryModel;
