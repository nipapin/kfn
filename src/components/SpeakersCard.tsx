import { GroupOutlined } from "@mui/icons-material";
import { Alert, Typography } from "@mui/material";

export default function SpeakersCard({ speakers }: { speakers: string | undefined }) {
	return (
		speakers && (
			<Alert variant='filled' icon={false} sx={{ mt: "1rem", color: "black", backgroundColor: "#f5f5f5" }}>
				<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
					<GroupOutlined fontSize='small' /> Участники
				</Typography>
				<Typography fontSize={{ lg: "1rem", xs: "0.8rem" }} fontWeight={400} sx={{ textWrap: "balance", whiteSpace: "pre-line" }}>
					{speakers}
				</Typography>
			</Alert>
		)
	);
}
