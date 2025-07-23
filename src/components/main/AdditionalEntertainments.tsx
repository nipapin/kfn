import { entertainments } from "@/db/database";
import "@/styles/additional-entertainments.css";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, SxProps } from "@mui/material";
import NextLink from "next/link";
import Title from "../shared/Title";
import { translate } from "@/utilities/translator";

const getFirstSentence = (description: string) => {
	const index_1 = description.indexOf(".");
	const index_2 = description.indexOf("!");
	const index_3 = description.indexOf("?");
	const index = Math.min(...[index_1, index_2, index_3].filter((index) => index > -1));
	return description.slice(0, index + 1);
};

function AdditionalEntertainments(props: { sx?: SxProps; special?: boolean }) {
	return (
		<Box id='additional-entertainments-container' sx={{ ...props.sx, pb: "6rem", px: "1rem" }}>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
				<Title text={props.special ? "Развлекательные мероприятия" : "Дополнительные мероприятия"} />
				<Box id='additional-entertainments-grid'>
					{(props.special ? entertainments.filter((pack) => pack.special) : entertainments).map((pack) => (
						<Box key={pack.id}>
							<Card sx={{ borderRadius: "1rem", height: "100%", display: "flex", flexDirection: "column" }} variant='outlined'>
								<CardHeader
									title={pack.title}
									slotProps={{ title: { sx: { fontSize: "1.2rem", textTransform: "capitalize" } } }}
									subheader={`${pack.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}`}
								/>
								<CardMedia component={"img"} src={pack.image} alt={pack.title} sx={{ height: "200px" }} />
								<CardContent>{getFirstSentence(pack.description)}</CardContent>
								<CardActions sx={{ mt: "auto", "& a": { ml: "auto" } }}>
									<NextLink href={`/additional-entertainments/${translate(pack.title)}`} passHref>
										<Button variant='text' color='primary' endIcon={<ArrowForward />}>
											Подробнее
										</Button>
									</NextLink>
								</CardActions>
							</Card>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
}

export default AdditionalEntertainments;
