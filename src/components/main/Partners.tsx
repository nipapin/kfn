"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import PartnerCard from "../layout/PartnerCard";
import Title from "../shared/Title";
import { partners } from "@/db/database";

export default function Partners() {
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
				<Title text='Партнёры' />
				{partners.map((partner, index, self) => {
					const isLast = index === self.length - 1;
					return (
						<PartnerCard
							key={partner.name}
							image={partner.image}
							name={partner.name}
							description={partner.description}
							type={partner.type || ""}
							divider={!isLast}
							video={partner.video}
						/>
					);
				})}
			</Box>
		</Box>
	);
}
