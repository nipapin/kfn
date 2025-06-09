import { Box, Typography } from "@mui/material";

export default function Footer() {
	return (
		<Box component='footer' sx={{ backgroundColor: "primary.main", color: "white" }}>
			<Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
				<Typography variant='body1'>Footer</Typography>
			</Box>
		</Box>
	);
}
