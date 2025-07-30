import { TimelineItem } from "@/app/types/interfaces";
import { Alert, Typography } from "@mui/material";

export default function SpeakerCard({ speaker }: { speaker: TimelineItem["speaker"] }) {
	return (
		speaker && (
			<Alert
				variant='outlined'
				icon={false}
				sx={{ mt: "1rem", borderColor: "primary.main", color: "primary.main", backgroundColor: "secondary.main" }}
			>
				<Typography fontSize={"1rem"} fontWeight={500} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
					{speaker.name}
				</Typography>
				<Typography fontSize={{ lg: "1rem", xs: "0.8rem" }} fontWeight={400} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
					{speaker.description}
				</Typography>
			</Alert>
		)
	);
}
