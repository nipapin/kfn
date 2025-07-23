"use client";

import { TourContentItem } from "@/app/types/interfaces";
import { AccessTime } from "@mui/icons-material";
import { Box, Chip, Paper, Typography } from "@mui/material";

export default function TourContent({ content }: { content: TourContentItem[] }) {
	return (
		<Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
			{content.map((item) => (
				<Paper variant='outlined' key={item.id} sx={{ p: "1rem", borderRadius: "1rem", borderLeftColor: "primary.main", borderLeftWidth: "4px" }}>
					<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} py={"0.5rem"}>
						<Typography variant='h4' fontSize={"1.2rem"} fontWeight={"500"}>
							{item.title}
						</Typography>
						<Chip
							label={
								<Typography variant='body1' fontSize={"12px"} display={"flex"} alignItems={"center"}>
									<AccessTime sx={{ mr: "0.5rem" }} fontSize={"small"} />
									{item.time}
								</Typography>
							}
							variant='outlined'
							color='primary'
							size='small'
						/>
					</Box>
					<Typography fontSize={"1rem"} fontWeight={"400"} width={"80%"}>
						{item.description}
					</Typography>
				</Paper>
			))}
		</Box>
	);
}
