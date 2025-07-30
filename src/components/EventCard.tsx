"use client";

import { TimelineItem } from "@/app/types/interfaces";
import { Typography } from "@mui/material";
import SpeakerCard from "./SpeakerCard";
import SpeakersCard from "./SpeakersCard";
import { EventCardHeader, EventCardPaper } from "./styled";
import TimeChip from "./TimeChip";
import EventDescription from "./EventDescription";

export default function EventCard({ program }: { program: TimelineItem }) {
	return (
		<EventCardPaper variant='outlined'>
			<EventCardHeader>
				<Typography fontSize={{ lg: "1.25rem", md: "1rem", sm: "0.75rem", xs: "0.5rem" }} fontWeight={500}>
					{program.name}
				</Typography>
				<TimeChip time={program.time} />
			</EventCardHeader>
			<EventDescription description={program.description} />
			<SpeakerCard speaker={program.speaker} />
			<SpeakersCard speakers={program.speakers} />
		</EventCardPaper>
	);
}
