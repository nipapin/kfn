"use client";

import { Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

export default function Title({ text }: { text: string }) {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));
	return (
		<Typography variant='h2' textAlign={"center"} mb={4} fontSize={isMobile ? "2rem" : "3rem"} fontWeight={"bold"}>
			{text}
		</Typography>
	);
}
