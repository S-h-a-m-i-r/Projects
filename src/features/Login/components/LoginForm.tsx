import { Stack } from "@mui/material";
import Input from "components/Input";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "components/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React, { useContext } from "react";
import { useAppDispatch, useAppSelect } from "hooks/reduxHook";
import { loginUser } from "../ducks/login.action";
import { AuthContext } from "context/AuthContext";

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelect((state) => state.user);
	const { login } = useContext(AuthContext);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// NOTE: You will bring email and password from  your inputs.
		dispatch(loginUser({ email: "abc@gmail.com", password: "123456" }));
	};

	return (
		<Stack rowGap={15} alignItems="center" component="form" onSubmit={onSubmit}>
			<Typography variant="h4" fontWeight={(theme) => theme.typography.fontWeightBold}>
				Login
			</Typography>
			<Input
				variant="outlined"
				size="small"
				InputProps={{
					startAdornment: <EmailOutlinedIcon sx={{ margin: (theme) => theme.spacing(5) }} />,
				}}
				fullWidth
				placeholder="Email"
				sx={{ maxWidth: "60%" }}
			/>

			<Input
				variant="outlined"
				size="small"
				InputProps={{
					startAdornment: <LockIcon sx={{ margin: (theme) => theme.spacing(5) }} />,
				}}
				fullWidth
				placeholder="Password"
				sx={{ maxWidth: "60%" }}
			/>

			<Stack direction="row" justifyContent="space-around" alignItems="center" alignSelf="center" sx={{ width: "80%" }}>
				<FormControlLabel control={<Checkbox />} label="Remember Me" />
				<Link to="/">Forgot Password</Link>
			</Stack>
			<Button
				type="submit"
				variant="contained"
				fullWidth
				size="large"
				sx={{
					borderRadius: (theme) => theme.shape.borderRadius * 3,
					padding: (theme) => theme.spacing(5),
					maxWidth: "45%",
				}}
				disabled={loading}
				onClick={login}
			>
				{loading ? "Please wait..." : "Login"}
			</Button>

			<Typography sx={{ marginTop: (theme) => theme.spacing(5) }}>
				Already have an account? <Link to="/signup">Signup</Link>
			</Typography>
		</Stack>
	);
};

export default LoginForm;
