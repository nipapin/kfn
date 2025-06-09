import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ThemeWrapper } from "@/theme/ThemeWrapper";
import type { Metadata } from "next";

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
			<body>
				<ThemeWrapper>
					<Navigation />
					{children}
					<Footer />
				</ThemeWrapper>
			</body>
		</html>
	);
}
