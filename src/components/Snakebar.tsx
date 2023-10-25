import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { setError } from "libs/redux/error/error.reducer";
import { useSnackbar } from "notistack";

const Snakebar: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const { error, open, severity } = useAppSelect((state) => state.error);

	const onCloseSnakebar = useCallback(() => {
		dispatch(setError({ error: "", open: false, severity }));
	}, [dispatch, severity]);

	useEffect(() => {
		if (!open) return;

		enqueueSnackbar(error, {
			variant: severity,
			anchorOrigin: {
				horizontal: "right",
				vertical: "top",
			},
		});

		const timeout = setTimeout(() => {
			onCloseSnakebar();
		}, 5000);

		return function onUnmount() {
			clearTimeout(timeout);
		};
	}, [open, onCloseSnakebar, severity, enqueueSnackbar, error]);

	return <></>;
};

export default Snakebar;
