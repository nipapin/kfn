import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ThemeWrapper } from "@/theme/ThemeWrapper";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./global.css";
import Wrapper from "@/components/Wrapper";
import UpNavigation from "@/components/UpNavigation";

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
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
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
