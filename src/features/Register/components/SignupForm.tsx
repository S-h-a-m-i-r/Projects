import Input from "components/Input";
import { Typography } from "@mui/material";
import Link from "components/Link";
import { Stack } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import UserRole from "./UserRole";

const SignupForm = () => {
	return (
		<Stack
			spacing={15}
			justifyContent="center"
			alignItems="center"
			direction="column"
			sx={{ width: "100%" }}
			component="form"
		>
			<Input
				variant="outlined"
				size="small"
				InputProps={{
					startAdornment: <AccountCircleIcon sx={{ margin: (theme) => theme.spacing(2) }} />,
				}}
				placeholder="Username"
				fullWidth
				sx={{ maxWidth: "60%" }}
			/>

			<Input
				variant="outlined"
				size="small"
				InputProps={{
					startAdornment: <MailOutlineIcon sx={{ margin: (theme) => theme.spacing(2) }} />,
				}}
				fullWidth
				placeholder="Email"
				sx={{ maxWidth: "60%" }}
			/>

			<Input
				variant="outlined"
				size="small"
				InputProps={{
					startAdornment: <LockIcon sx={{ margin: (theme) => theme.spacing(2) }} />,
				}}
				fullWidth
				placeholder="Password"
				sx={{ maxWidth: "60%" }}
			/>

			<UserRole />

			<Button
				type="submit"
				variant="contained"
				fullWidth
				size="large"
				sx={{
					borderRadius: (theme) => theme.shape.borderRadius * 3,
					padding: (theme) => theme.spacing(6),
					maxWidth: "45%",
				}}
				component={Link}
				to="/dashboard"
			>
				Sign up
			</Button>
			<Typography>
				Already have an account? <Link to="/login">Login</Link>
			</Typography>
		</Stack>
	);
};

export default SignupForm;
