"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const images = [
	"/images/spotlight-foto2.jpg",
	"/images/spotlight-foto4.jpg",
	"/images/spotlight-foto6.jpg",
	"/images/spotlight-foto7.jpg",
	"/images/spotlight-foto8.jpg"
];

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Box
				sx={{
					position: "relative",
					width: "100%",
					height: isMobile ? "300px" : "600px",
					overflow: "hidden",
					borderRadius: "1rem"
				}}
			>
				<Box
					sx={{
						display: "flex",
						transition: "transform 0.5s ease-in-out",
						height: "100%",
						transform: `translateX(-${currentIndex * 100}%)`
					}}
				>
					{images.map((image, index) => (
						<Box
							key={index}
							sx={{
								minWidth: "100%",
								height: "100%",
								position: "relative"
							}}
						>
							<Image
								src={image}
								alt={`carousel-image-${index}`}
								fill
								style={{
									objectFit: "cover"
								}}
							/>
						</Box>
					))}
				</Box>
				<IconButton
					sx={{
						position: "absolute",
						left: 16,
						top: "50%",
						transform: "translateY(-50%)",
						bgcolor: "rgba(255, 255, 255, 0.8)",
						"&:hover": {
							bgcolor: "rgba(255, 255, 255, 0.9)"
						}
					}}
					onClick={handlePrev}
				>
					<ChevronLeft />
				</IconButton>
				<IconButton
					sx={{
						position: "absolute",
						right: 16,
						top: "50%",
						transform: "translateY(-50%)",
						bgcolor: "rgba(255, 255, 255, 0.8)",
						"&:hover": {
							bgcolor: "rgba(255, 255, 255, 0.9)"
						}
					}}
					onClick={handleNext}
				>
					<ChevronRight />
				</IconButton>
				<Box
					sx={{
						position: "absolute",
						bottom: 16,
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						gap: 1
					}}
				>
					{images.map((_, index) => (
						<Box
							key={index}
							sx={{
								width: 8,
								height: 8,
								borderRadius: "50%",
								bgcolor: currentIndex === index ? "primary.main" : "grey.300",
								cursor: "pointer"
							}}
							onClick={() => setCurrentIndex(index)}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
}
