import { TimelineItem, TimelineProps } from "@/app/types/interfaces";
import { AccessTime, CalendarMonth, GroupOutlined, Place } from "@mui/icons-material";
import { Alert, Box, Chip, Paper, Skeleton, Stack, Typography } from "@mui/material";

import "@/styles/business.css";

export default function Timeline({ timeline }: TimelineProps) {
	const lunchIndex = timeline.content.findIndex((program) => program.name === "Обед");
	const morningProgram = timeline.content.slice(0, lunchIndex);
	const lunch = timeline.content[lunchIndex];

	const parallelProgram = Object.values(
		timeline.content.reduce<Record<string, TimelineItem[]>>(
			(acc, program) => ({ ...acc, [program.time]: [...(acc[program.time] || []), program] }),
			{}
		)
	).filter((item) => item.length > 1);

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
					<Paper
						key={program.name}
						variant='outlined'
						sx={{ width: "100%", padding: "1rem", borderLeft: "3px solid", borderLeftColor: "primary.main", borderRadius: "0.5rem" }}
					>
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
							<Typography fontSize={{ lg: "1.25rem", xs: "1rem" }} fontWeight={500}>
								{program.name}
							</Typography>
							<Chip
								size={"small"}
								variant='outlined'
								color='info'
								label={
									<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
										<AccessTime fontSize='small' />
										{program.time}
									</Typography>
								}
							/>
						</Box>
						{program.speaker && (
							<Alert
								variant='outlined'
								icon={false}
								sx={{ mt: "1rem", borderColor: "primary.main", color: "white", backgroundColor: "primary.main", borderRadius: "0.5rem" }}
							>
								<Typography fontSize={"1rem"} fontWeight={500} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
									{program.speaker.name}
								</Typography>
								<Typography fontSize={{ lg: "1rem", xs: "0.8rem" }} fontWeight={400} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
									{program.speaker.description}
								</Typography>
							</Alert>
						)}
						{program.description && (
							<Typography fontSize={{ lg: "1rem", xs: "0.8rem" }} fontWeight={400} mt={"1rem"} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
								{program.description}
							</Typography>
						)}
						{program.speakers && (
							<Alert variant='filled' icon={false} sx={{ mt: "1rem", color: "black", backgroundColor: "#f5f5f5" }}>
								<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
									<GroupOutlined fontSize='small' /> Участники
								</Typography>
								<Typography fontSize={{ lg: "1rem", xs: "0.8rem" }} fontWeight={400} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
									{program.speakers}
								</Typography>
							</Alert>
						)}
					</Paper>
				))}
			</Stack>
			<Alert id='timeline-lunch-alert' variant='outlined' icon={false}>
				<Typography textAlign={"center"} fontSize={"1.5rem"} fontWeight={500}>
					Обед
				</Typography>
				<Chip
					variant='filled'
					color='primary'
					label={
						<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white" }}>
							<AccessTime fontSize='small' />
							{lunch.time}
						</Typography>
					}
				/>
			</Alert>
			<Typography variant='h2' id='timeline-morning-program-title'>
				Послеобеденная программа
			</Typography>
			<Box id='timeline-program-container'>
				<Stack direction={"column"} gap={"1rem"} width={"100%"}>
					<Typography fontSize={{ lg: "1.5rem", xs: "1rem" }} fontWeight={500} sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
						<Place color='primary' /> Зал 1
					</Typography>
					{parallelProgram.map((parallel, index) => {
						const program = parallel[0];
						return (
							<Paper
								key={index}
								variant='outlined'
								sx={{ width: "100%", padding: "1rem", borderLeft: "3px solid", borderLeftColor: "primary.main", borderRadius: "0.5rem" }}
							>
								<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<Typography fontSize={{ lg: "1.25rem", md: "1rem", sm: "0.75rem", xs: "0.5rem" }} fontWeight={500}>
										{program.name}
									</Typography>
									<Chip
										variant='outlined'
										color='info'
										label={
											<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
												<AccessTime fontSize='small' />
												{program.time}
											</Typography>
										}
									/>
								</Box>
								<Typography fontSize={{ lg: "1.25rem", md: "1rem", sm: "0.75rem", xs: "0.5rem" }} fontWeight={500}>
									{program.name}
								</Typography>
								{program.speaker && (
									<Alert
										variant='outlined'
										icon={false}
										sx={{ mt: "1rem", borderColor: "primary.main", color: "primary.main", backgroundColor: "secondary.main", borderRadius: "0.5rem" }}
									>
										<Typography fontSize={"1rem"} fontWeight={500} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
											{program.speaker.name}
										</Typography>
										<Typography fontSize={{ lg: "1rem", xs: "0.8rem" }} fontWeight={400} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
											{program.speaker.description}
										</Typography>
									</Alert>
								)}
								{program.description && (
									<Typography
										fontSize={{ lg: "1rem", xs: "0.8rem" }}
										fontWeight={400}
										mt={"1rem"}
										sx={{ textWrap: "balance", whiteSpace: "pre-line" }}
									>
										{program.description}
									</Typography>
								)}
							</Paper>
						);
					})}
				</Stack>
				<Stack direction={"column"} gap={"1rem"} width={"100%"}>
					<Typography fontSize={{ lg: "1.5rem", xs: "1rem" }} fontWeight={500} sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
						<Place color='primary' /> Зал 2
					</Typography>
					{parallelProgram.map((parallel, index) => {
						const program = parallel[1];
						return (
							<Paper
								key={index}
								variant='outlined'
								sx={{ width: "100%", padding: "1rem", borderLeft: "3px solid", borderLeftColor: "primary.main", borderRadius: "0.5rem" }}
							>
								<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<Typography fontSize={"1.25rem"} fontWeight={500}>
										{program.name}
									</Typography>
									<Chip
										variant='outlined'
										color='info'
										label={
											<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
												<AccessTime fontSize='small' />
												{program.time}
											</Typography>
										}
									/>
								</Box>
								<Typography fontSize={"1.25rem"} fontWeight={500}>
									{program.name}
								</Typography>
								{program.speaker && (
									<Alert
										variant='outlined'
										icon={false}
										sx={{ mt: "1rem", borderColor: "primary.main", color: "primary.main", backgroundColor: "secondary.main", borderRadius: "0.5rem" }}
									>
										<Typography fontSize={"1rem"} fontWeight={500} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
											{program.speaker.name}
										</Typography>
										<Typography fontSize={{ lg: "1rem", xs: "0.8rem" }} fontWeight={400} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
											{program.speaker.description}
										</Typography>
									</Alert>
								)}
								{program.description && (
									<Typography
										fontSize={{ lg: "1rem", xs: "0.8rem" }}
										fontWeight={400}
										mt={"1rem"}
										sx={{ textWrap: "balance", whiteSpace: "pre-line" }}
									>
										{program.description}
									</Typography>
								)}
							</Paper>
						);
					})}
				</Stack>
			</Box>
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
