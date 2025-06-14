import { Typography } from "@mui/material";
import React from "react";

export default function Title({ text }: { text: string }) {
	return (
		<Typography variant='h2' textAlign={"center"} mb={4} fontSize={"3rem"} fontWeight={"bold"}>
			{text}
		</Typography>
	);
}
