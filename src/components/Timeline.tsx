import { TimelineProps } from "@/app/types/interfaces";
import { CalendarMonth } from "@mui/icons-material";
import { Alert, Box, Chip, Skeleton, Stack, Typography } from "@mui/material";

import "@/styles/business.css";
import EventCard from "./EventCard";
import TimeChip from "./TimeChip";
import TimelineEvent from "./TimelineEvent";

export default function Timeline({ timeline }: TimelineProps) {
	const lunchIndex = timeline.content.findIndex((program) => program.name === "Обед");
	const morningProgram = timeline.content.slice(0, lunchIndex);
	const morningHallProgram = timeline.halls.map((hall) => ({ ...hall, content: hall.content.filter((program) => program.time < "13:00") }));
	const eveningHallProgram = timeline.halls.map((hall) => ({ ...hall, content: hall.content.filter((program) => program.time > "13:00") }));
	const lunch = timeline.content[lunchIndex];
	const eveningProgram = timeline.content.slice(lunchIndex + 1).filter(({ name }) => name !== "");

	return (
		<>
			<Box id='timeline-container'>
				<Chip
					id='timeline-date-chip'
					label={
						<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
							<CalendarMonth fontSize='small' />
							{timeline.date}
						</Typography>
					}
					sx={{ backgroundColor: "primary.main", color: "white" }}
				/>
				<Typography id='timeline-title' variant='h1' sx={{ textWrap: "balance", whiteSpace: "pre-line" }} fontWeight={500} textAlign={"center"}>
					{timeline.title}
				</Typography>
				<Typography id='timeline-description' variant='h2'>
					{timeline.description}
				</Typography>
			</Box>
			<Typography id='timeline-morning-program-title' variant='h2'>
				Утренняя программа
			</Typography>
			<Stack direction={"column"} gap={"1rem"} width={"100%"} mt={"2rem"}>
				{morningProgram.map((program) => (
					<EventCard key={program.name} program={program} />
				))}
			</Stack>
			<Box id='timeline-program-container'>
				{morningHallProgram.every((hall) => hall.content.length > 0) &&
					morningHallProgram.map((hall) => <TimelineEvent key={hall.name} hall={hall} />)}
			</Box>
			<Alert id='timeline-lunch-alert' variant='outlined' icon={false}>
				<Typography textAlign={"center"} fontSize={"1.5rem"} fontWeight={500}>
					Обед
				</Typography>
				<TimeChip time={lunch.time} color='primary' />
			</Alert>
			<Box id='timeline-program-container'>
				{eveningHallProgram.map((hall) => (
					<TimelineEvent key={hall.name} hall={hall} />
				))}
			</Box>
			<Stack direction={"column"} gap={"1rem"} width={"100%"} mt={"2rem"}>
				{eveningProgram.map((program) => (
					<EventCard key={program.name} program={program} />
				))}
			</Stack>
			<Chip
				label={
					<Typography
						fontSize={"0.875rem"}
						fontWeight={400}
						sx={{ textWrap: "balance", whiteSpace: "pre-line", display: "flex", alignItems: "center", gap: "0.5rem" }}
					>
						<Skeleton variant='circular' width={10} height={10} />
						Программа мероприятия будет дополняться
					</Typography>
				}
				variant='outlined'
				color='primary'
				sx={{ mt: "2rem", mx: "auto" }}
			/>
		</>
	);
}
