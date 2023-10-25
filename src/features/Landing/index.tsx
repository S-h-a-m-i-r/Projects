import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import Link from 'components/Link'
import useLogin from 'hooks/useLogin'

const LandingPage: React.FC = () => {
	const { onLogin } = useLogin()
	return (
		<>
			<Stack
				sx={{
					minHeight: '100vh',
					overflow: 'hidden',
				}}
			>
				<Stack
					flex={1}
					sx={{
						padding: (theme) => theme.spacing(16),
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Stack>
						<img src="/images/logo.png" alt="" height={'70%'} width={'70%'} />
					</Stack>
					<Stack
						sx={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: '5%',
						}}
					>
						<Link
							to="#"
							onClick={onLogin}
							sx={{
								backgroundColor: (theme) => theme.palette.primary.main,
								padding: (theme) => theme.spacing(5, 20, 5, 20),
								fontSize: (theme) => theme.typography.fontSize * 1.5,
								minWidth: '20%',
								borderRadius: (theme) => theme.shape.borderRadius * 3,
								':hover': {
									backgroundColor: (theme) => theme.palette.primary.dark,
								},
								color: 'bw.white',
							}}
						>
							Login
						</Link>
						<Link
							to="/signup"
							sx={{
								backgroundColor: (theme) => theme.palette.primary.main,
								padding: (theme) => theme.spacing(5, 20, 5, 20),
								fontSize: (theme) => theme.typography.fontSize * 1.5,
								minWidth: '20%',
								borderRadius: (theme) => theme.shape.borderRadius * 3,
								':hover': {
									backgroundColor: (theme) => theme.palette.primary.dark,
								},
								color: 'bw.white',
							}}
						>
							Signup
						</Link>
					</Stack>
				</Stack>
				<Stack
					sx={{
						flexGrow: 1,
						justifyContent: 'center',
						position: 'relative',
						overflow: 'hidden',
						height: '83vh',
					}}
				>
					<Stack
						sx={{
							flexGrow: 1,
							position: 'absolute',
							zIndex: -1,
							width: '100%',
						}}
					>
						<img src="/images/backpic.jpeg" alt="" />
					</Stack>
					<Stack
						sx={{
							color: (theme) => theme.palette.bw.white,
							padding: (theme) => theme.spacing(16),
						}}
					>
						<Typography
							variant="h1"
							sx={{
								fontWeight: (theme) => theme.typography.fontWeightBold,
							}}
						>
							Appraisal <br /> System
						</Typography>
						<Typography
							variant="h6"
							sx={{
								fontWeight: (theme) => theme.typography.fontWeightRegular,
							}}
						>
							<p>
								You won’t find it difficult to prove that battles, campaigns, <br />
								and even wars have been won or lost primarily because of logistics
							</p>
						</Typography>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							size="large"
							sx={{
								borderRadius: (theme) => theme.shape.borderRadius * 3,
								padding: (theme) => theme.spacing(6),
								width: '12%',
							}}
						>
							Explore
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</>
	)
}

export default LandingPage
