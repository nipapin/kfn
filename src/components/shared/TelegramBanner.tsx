import { ArrowForward, Telegram } from "@mui/icons-material";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import NextLink from "next/link";

export default function TelegramBanner() {
	return (
		<Paper
			sx={{
				width: "fit-content",
				mx: "auto",
				p: 2,
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: "1rem",
				backgroundColor: "primary.main",
				color: "white",
				borderRadius: "1rem"
			}}
		>
			<Telegram sx={{ fontSize: { xs: "2rem", lg: "5rem" } }} />
			<Typography fontSize={{ xs: "0.875rem", lg: "2rem" }} lineHeight={1} mr={{ xs: "1rem", lg: "4rem" }} sx={{ whiteSpace: "pre-line" }}>
				{`Присоединяйтесь к нашему\nтелеграмм каналу`}
			</Typography>
			<NextLink href='https://t.me/+eb5NWF3qGdZkMzcy' target='_blank'>
				<Button variant='contained' color='secondary' sx={{ width: "100%", display: { xs: "none", sm: "inline-flex" } }} endIcon={<ArrowForward />}>
					<Typography>Перейти</Typography>
				</Button>
				<IconButton color='secondary' sx={{ display: { xs: "inline-flex", sm: "none" } }}>
					<ArrowForward />
				</IconButton>
			</NextLink>
		</Paper>
	);
}
