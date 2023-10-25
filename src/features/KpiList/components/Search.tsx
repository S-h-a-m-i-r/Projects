import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
	const navigate = useNavigate();
	const handleKpi = () => {
		navigate("/dashboard");
	};

	const Search = styled("div")(({ theme }) => ({
		position: "relative",
		borderRadius: theme.shape.borderRadius * 2,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		height: theme.spacing(15),
		alignSelf: "center",
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},

		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "auto",
		},
	}));

	const SearchIconWrapper = styled("div")(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.bw.greyLight,
		marginLeft: "4.5%",
	}));

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		"& .MuiInputBase-input": {
			padding: theme.spacing(2, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(13)})`,
			width: "100%",
			marginLeft: "4.5%",
			[theme.breakpoints.up("sm")]: {
				width: "22ch",
			},
		},
	}));

	return (
		<>
			<Box>
				<Button
					type="button"
					variant="contained"
					size="medium"
					sx={{
						position: "absolute",
						top: (theme) => theme.spacing(57),
						right: (theme) => theme.spacing(10),
						backgroundColor: "red",
						color: "white",
					}}
					onClick={handleKpi}
				>
					Create KPI
				</Button>
				<Toolbar sx={{ marginBottom: (theme) => theme.spacing(20) }}>
					<Search
						sx={{
							boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)",
						}}
					>
						<SearchIconWrapper>
							<SearchIcon fontSize="small" />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search by role"
							inputProps={{ "aria-label": "search" }}
							sx={{
								marginLeft: (theme) => theme.spacing(15),
							}}
						/>
					</Search>
				</Toolbar>
			</Box>
		</>
	);
};

export default Search;
