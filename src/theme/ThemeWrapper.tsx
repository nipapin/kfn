"use client";
import { createTheme, CssBaseline, ThemeOptions, ThemeProvider } from "@mui/material";

const themeConfig: ThemeOptions = {
	palette: {
		primary: {
			main: "#780522"
		},
		secondary: {
			main: "#ffffff"
		},
		warning: {
			main: "#fff107"
		}
	},
	typography: {
		fontFamily: "Geist, sans-serif",
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none"
				}
			}
		}
	}
};

const theme = createTheme(themeConfig);

const darkTheme = createTheme({ ...themeConfig, palette: { ...themeConfig.palette, mode: "dark" } });

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export const DarkThemeWrapper = ({ children }: { children: React.ReactNode }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};
