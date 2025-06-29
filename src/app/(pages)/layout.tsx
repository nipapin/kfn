import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import UpNavigation from "@/components/shared/UpNavigation";
import "@/styles/global.css";
import { ThemeWrapper } from "@/theme/ThemeWrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "КФН: Новые Горизонты",
	description:
		"Калининградский форум недвижимости: Новые Горизонты — это ваш ключ к эксклюзивной информации и новым возможностям в сфере недвижимости."
};

export const dynamic = "force-dynamic";

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
	const cookieStore = await cookies();
	const token = cookieStore.get("kfntoken");
	const isRegistered = token?.value === "authenticated";
	return (
		<html lang='ru'>
			<head>
				<link href='https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap' rel='stylesheet' />
			</head>
			<body>
				<AppRouterCacheProvider options={{ key: "kfn" }}>
					<ThemeWrapper>
						<UpNavigation />
						<Navigation isRegistered={isRegistered} />
						{children}
						<Footer />
					</ThemeWrapper>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
