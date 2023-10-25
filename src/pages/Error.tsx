import { Stack } from "@mui/system";
import Link from "components/Link";
import { Typography } from "@mui/material";

const Error: React.FC = () => {
	return (
		<Stack alignItems="center" sx={{ marginTop: (theme) => theme.spacing(27) }}>
			<img
				src="/images/Error.jpeg"
				alt="error pic"
				style={{
					width: "35%",
				}}
			/>

			<Typography textAlign="center">
				<Typography sx={{ fontSize: (theme) => theme.typography.fontSize * 4 }}> Error 404! </Typography>
				Look like the page you are looking for doesn't exist!
			</Typography>

			<Link
				to="/"
				sx={{
					marginTop: (theme) => theme.spacing(17),
					minWidth: "13%",
					textAlign: "center",
					backgroundColor: (theme) => theme.palette.primary.main,
					padding: (theme) => theme.spacing(5, 20, 5, 20),
					fontSize: (theme) => theme.typography.fontSize * 1.5,
					borderRadius: (theme) => theme.shape.borderRadius * 3,
					height: "3.5vh",
					":hover": {
						backgroundColor: (theme) => theme.palette.primary.dark,
					},
					color: "bw.white",
				}}
			>
				Back to Home
			</Link>
		</Stack>
	);
};

export default Error;
