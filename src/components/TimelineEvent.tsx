import { Hall } from "@/app/types/interfaces";
import { Place } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import EventCard from "./EventCard";

export default function TimelineEvent({ hall }: { hall: Hall }) {
	return (
		<Stack direction={"column"} gap={"1rem"} width={"100%"}>
			<Typography fontSize={{ lg: "1.5rem", xs: "1rem" }} fontWeight={500} sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
				<Place color='primary' /> {hall.name}
			</Typography>
			{hall.content.map((program, index) => (
				<EventCard key={index} program={program} />
			))}
		</Stack>
	);
}
