import { Typography } from "@mui/material";
import React from "react";

export default function EventDescription({ description }: { description: string }) {
	return (
		<Typography
			fontSize={{ lg: "1rem", xs: "0.8rem" }}
			fontWeight={400}
			mt={"1rem"}
			sx={{ textWrap: "balance", whiteSpace: "pre-line" }}
			dangerouslySetInnerHTML={{ __html: description }}
		/>
	);
}
