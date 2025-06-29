import DashboardAppBar from "@/components/admin/DashboardAppBar";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { ThemeWrapper } from "@/theme/ThemeWrapper";
import { Container } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const isAdmin = cookieStore.get("kfntoken");

	return (
		<html lang='ru'>
			<head>
				<link href='https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap' rel='stylesheet' />
			</head>
			<body>
				<AppRouterCacheProvider options={{ key: "kfn" }}>
					<ThemeWrapper>
						{isAdmin && <DashboardAppBar />}
						<Container maxWidth='xl' sx={{ pb: "6rem", display: "grid", gridTemplateColumns: "300px 1fr", gap: "2rem" }}>
							<DashboardSidebar />
							{children}
						</Container>
					</ThemeWrapper>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
