import { Box } from "@mui/material";
import Title from "../shared/Title";

export default function YandexMap() {
	return (
		<Box
			sx={{
				width: "100%",
				height: { lg: "100%", xs: "100vh" },
				maxWidth: "1200px",
				mx: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				pt: { lg: 4, xs: 0 },
				pb: { lg: 10, xs: 0 },
				px: "1rem"
			}}
		>
			<Title text='Мы располагаемся' />
			<iframe
				src='https://yandex.ru/map-widget/v1/?um=constructor%3Ac13ed1c259f77aba834b10ab1276d34cc96ff2f35e66548a0d787b0b740452cb&source=constructor'
				width='100%'
				height='600'
				style={{ border: "none", borderRadius: "1rem" }}
			/>
		</Box>
	);
}
