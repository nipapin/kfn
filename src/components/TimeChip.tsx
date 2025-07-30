import { AccessTime } from "@mui/icons-material";
import { Chip, Typography } from "@mui/material";

export default function TimeChip({ time, color = "info" }: { time: string; color?: "info" | "primary" }) {
	return (
		<Chip
			variant='outlined'
			color={color}
			label={
				<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
					<AccessTime fontSize='small' />
					{time}
				</Typography>
			}
		/>
	);
}
