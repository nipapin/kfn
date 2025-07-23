import TourContent from "@/components/Tours/TourContent";
import { tours } from "@/db/database";
import { Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";

interface TourPageProps {
	params: Promise<{
		tourid: string;
	}>;
}

export default async function TourPage({ params }: TourPageProps) {
	const { tourid } = await params;
	const tour = tours.find((tour) => tour.id === tourid);
	if (!tour) {
		return notFound();
	}
	return (
		<Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: "1rem", py: "10rem" }}>
			<Typography variant='h1' fontSize={"2rem"} fontWeight={"400"} textAlign={"center"}>
				{tour.name}
			</Typography>
			<Typography variant='h2' fontSize={"1.5rem"} color={"primary"} textAlign={"center"}>
				{tour.type}
			</Typography>
			<TourContent content={tour.content} />
		</Container>
	);
}
