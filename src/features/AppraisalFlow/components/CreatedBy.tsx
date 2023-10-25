import { Typography } from "@mui/material";
import { checkSession } from "libs/session";
import Input from "components/Input";

const CreatedBy = ({ initialValue }: { initialValue?: number }) => {
	const { dataValues } = checkSession();
	console.log("session ", dataValues);

	return (
		<>
			<Typography fontSize={(theme) => theme.typography.fontSize + 2}>Created By</Typography>
			<Input
				size="small"
				placeholder="write Number"
				required
				sx={{
					width: (theme) => theme.spacing(250),
				}}
			/>
		</>
	);
};

export default CreatedBy;
