import { Box, Paper, styled } from "@mui/material";

const EventCardPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	padding: "1rem",
	borderLeft: "3px solid",
	borderLeftColor: theme.palette.primary.main,
	borderRadius: "0.5rem"
}));

const EventCardHeader = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center"
});

export { EventCardHeader, EventCardPaper };

