import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface PartnerCardProps {
	image: {
		src: string;
		width: number;
		height: number;
		alt: string;
	};
	name: string;
	description: string;
	type: string;
}

export default function PartnerCard({ image, name, description, type }: PartnerCardProps) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", py: "4rem" }}>
			<Typography sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}>{type}</Typography>
			<Box sx={{ display: "flex", flexDirection: { xs: "column-reverse", md: "row" }, justifyContent: "space-between", width: "100%" }}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: { md: "500px", xs: "100%" } }}>
					<Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>{name}</Typography>
					<Typography sx={{ fontSize: "1rem", fontWeight: 400 }}>{description}</Typography>
				</Box>
				<Box
					sx={{
						width: { md: "500px", xs: "100%" },
						height: "auto",
						display: "flex",
						justifyContent: "center",
						"& img": { width: "100%", height: "auto" }
					}}
				>
					<Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
				</Box>
			</Box>
			<Divider sx={{ my: "4rem" }} />
		</Box>
	);
}
