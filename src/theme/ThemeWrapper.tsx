"use client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#780522"
		},
		secondary: {
			main: "#ffd700"
		}
	}
});

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
