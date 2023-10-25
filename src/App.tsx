import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./libs/redux";
import { AuthContextProvider } from "context/AuthContext";
import { routes } from "routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";

import theme from "theme";
import Snakebar from "components/Snakebar";
import { SnackbarProvider } from "notistack";

function App() {
	const content = useRoutes(routes);
	return (
		<HelmetProvider>
			<Helmet titleTemplate="Appraisal System" defaultTitle="Appraisal System" />
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider maxSnack={3}>
						<Snakebar />
						<AuthContextProvider>{content}</AuthContextProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</Provider>
		</HelmetProvider>
	);
}

export default App;
