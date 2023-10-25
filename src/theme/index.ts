import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
	typography: {
		fontFamily: "Poppins",
		fontSize: 12,
		fontWeightBold: 700,
		fontWeightMedium: 600,
		fontWeightLight: 500,
		fontWeightRegular: 400,
	},
	palette: {
		advancedShadow: {
			basicShadow: "0px 2.8px 9.8px 0px rgba(0, 0, 0, 0.1)",
			simpleShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
			mediumShadow:
				"0px 0px 0px 0px rgba(0, 0, 0, 0.05), 0px 20px 44px 0px rgba(0, 0, 0, 0.05),0px 81px 81px 0px rgba(0, 0, 0, 0.04), 0px 181px 109px 0px rgba(0, 0, 0, 0.03),0px 322px 129px 0px rgba(0, 0, 0, 0.01), 0px 504px 141px 0px rgba(0, 0, 0, 0)",
		},
		bw: {
			black: "#000000",
			blackLight: "#222122",
			white: "#ffffff",
			grey: "#E8E8E8",
			greyLight: "#00000080",
			greyLightest: "#000000BF",
			backgroundColor: "#F7F7F7",
			blackLightest: "#00000040",
			green: "#7CC08B",
			greybtn: "#DCDCDC",
		},
		primary: {
			light: "#757ce8",
			main: "#EC1E26",
			dark: "#002884",
		},
		secondary: {
			light: "#004F70",
			main: "#004F70",
			dark: "#004F70",
		},
	},
	shape: {
		borderRadius: 8,
	},
	spacing: 2,
});

export default defaultTheme;
