import { ThemeWrapper } from "@/theme/ThemeWrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ru'>
			<head>
				<link href='https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap' rel='stylesheet' />
			</head>
			<body>
				<AppRouterCacheProvider options={{ key: "kfn" }}>
					<ThemeWrapper>{children}</ThemeWrapper>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
