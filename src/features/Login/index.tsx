import { Stack } from "@mui/material";
import LoginForm from "./components/LoginForm";

const LoginPage: React.FC = () => {
	return (
		<>
			<Stack
				sx={{
					backgroundColor: "bw.grey",
					width: (theme) => theme.spacing(370),
					height: "100vh",
				}}
				textAlign="center"
			>
				<Stack
					spacing={25}
					direction="column"
					justifyContent="center"
					flex={1}
					sx={{
						height: (theme) => theme.spacing(330),
						padding: (theme) => theme.spacing(2),
					}}
				>
					<Stack sx={{ marginLeft: (theme) => theme.spacing(125) }}>
						<img src="/images/Teo_logo.png" alt="img" height="110 " width="210" />
					</Stack>
					<LoginForm />
				</Stack>
			</Stack>

			<Stack
				flex={1}
				sx={{
					marginLeft: (theme) => theme.spacing(400),
					marginTop: (theme) => theme.spacing(-300),
				}}
			>
				<img src="/images/DataSecurity.png" alt="" style={{ width: "80%" }} />
			</Stack>
		</>
	);
};

export default LoginPage;
