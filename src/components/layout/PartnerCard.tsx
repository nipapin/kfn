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
	divider: boolean;
}

export default function PartnerCard({ image, name, description, type, divider }: PartnerCardProps) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
			<Typography sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}>{type}</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column-reverse", md: "row" },
					justifyContent: "space-between",
					width: "100%",
					alignItems: "center",
					gap: { md: "0", xs: "1rem" }
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "column", gap: { md: "1rem", xs: "0.5rem" }, width: { md: "500px", xs: "100%" } }}>
					<Typography sx={{ fontSize: { md: "2rem", xs: "1.5rem" }, fontWeight: 600, display: { xs: "none", md: "block" } }}>{name}</Typography>
					<Typography sx={{ fontSize: { md: "1rem", xs: "0.875rem" }, fontWeight: 400, textWrap: "balance" }}>{description}</Typography>
				</Box>
				<Box
					sx={{
						width: { md: "300px", xs: "100%" },
						aspectRatio: `${image.width} / ${image.height}`,
						height: { md: `calc(300px * ${image.height} / ${image.width})`, xs: "auto" },
						display: "flex",
						justifyContent: "center",
						"& img": { width: "100%", height: "auto" }
					}}
				>
					<Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
				</Box>
			</Box>
			{divider && <Divider sx={{ my: "2rem" }} />}
		</Box>
	);
}
