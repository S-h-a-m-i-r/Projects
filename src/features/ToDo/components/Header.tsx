import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import DrawerHeader from "components/DrawerHeader";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const completed = () => {
		navigate("/completed");
	};
	return (
		<AppBar position="static" sx={{ boxShadow: "none", backgroundColor: "white" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<DrawerHeader>
						<Box
							component="img"
							src="/images/logo/teo.png"
							alt="teo-logo"
							sx={{
								width: 110,
								height: 62,
								ml: 40,
								mt: 13,
							}}
						/>
					</DrawerHeader>
				</Toolbar>

				<Box
					sx={{
						display: { xs: "none", md: "flex" },
						backgroundColor: "white",
						ml: 100,
					}}
				>
					<Button sx={{ color: "black" }}>todo</Button>
					<Button onClick={completed} sx={{ ml: 10, color: "black" }}>
						completed
					</Button>
				</Box>
				<Divider />
			</Container>
		</AppBar>
	);
};

export default Header;
