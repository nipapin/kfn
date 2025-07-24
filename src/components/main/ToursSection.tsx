"use client";

import { tours } from "@/db/database";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Title from "../shared/Title";
import TourCard from "../Tours/TourCard";

export default function ToursSection() {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				maxWidth: "1200px",
				mx: "auto",
				py: isMobile ? "4rem" : "10rem",
				px: "1rem",
				pb: "4rem"
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
				<Title text='Брокер туры' />
				<Typography textAlign={"center"} mb={4}>
					Посетите наши туры и познакомьтесь с недвижимостью Калининграда
				</Typography>
				<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: "1rem" }}>
					{tours.map((tour) => (
						<TourCard key={tour.id} tour={tour} />
					))}
				</Box>
			</Box>
		</Box>
	);
}
