import { Box, Typography } from "@mui/material";
import React from "react";
import Title from "../Title";

export default function YandexMap() {
	return (
		<Box
			sx={{
				width: "100%",
				height: "50vh",
				maxWidth: "1200px",
				mx: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				mb: 10
			}}
		>
			<Title text='Мы располагаемся' />
			<iframe
				src='https://yandex.ru/map-widget/v1/?um=constructor%3Ac13ed1c259f77aba834b10ab1276d34cc96ff2f35e66548a0d787b0b740452cb&source=constructor'
				width='100%'
				height='400'
				style={{ border: "none", borderRadius: "1rem" }}
			/>
		</Box>
	);
}
