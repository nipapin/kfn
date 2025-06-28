import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import UpNavigation from "@/components/shared/UpNavigation";
import { ThemeWrapper } from "@/theme/ThemeWrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
	title: "КФН: Новые Горизонты",
	description:
		"Калининградский форум недвижимости: Новые Горизонты — это ваш ключ к эксклюзивной информации и новым возможностям в сфере недвижимости."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<head>
				<link href='https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap' rel='stylesheet' />
			</head>
			<body>
				<AppRouterCacheProvider options={{ key: "kfn" }}>
					<ThemeWrapper>
						<UpNavigation />
						<Navigation />
						{children}
						<Footer />
					</ThemeWrapper>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
