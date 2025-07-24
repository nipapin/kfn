import { TourItem } from "@/app/types/interfaces";
import { translate } from "@/utilities/translator";
import { ArrowForward } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import NextLink from "next/link";

export default function TourCard({ tour }: { tour: TourItem }) {
	return (
		<Card variant='outlined' sx={{ borderRadius: "1rem", width: "100%" }}>
			<CardHeader
				title={tour.name}
				subheader={
					<Typography color='primary'>
						{tour.type} — {tour.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}
					</Typography>
				}
				slotProps={{ title: { sx: { fontSize: "1.2rem" } } }}
			/>
			<CardMedia component='img' image={tour.image} alt={tour.name} sx={{ height: "200px", objectFit: "cover" }} />
			<CardContent>
				<Typography>{tour.description}</Typography>
			</CardContent>
			<CardActions sx={{ "& a": { ml: "auto" } }}>
				<NextLink href={`/tours/${translate(tour.name + " " + tour.type)}`} passHref>
					<Button variant='text' color='primary' endIcon={<ArrowForward />}>
						Подробнее
					</Button>
				</NextLink>
			</CardActions>
		</Card>
	);
}
