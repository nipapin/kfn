import { CalendarMonth, PlaceOutlined } from "@mui/icons-material";
import { Box, Card, CardHeader, Container, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import RegistrationForm from "../shared/RegistrationForm";
import "@/styles/hero.css";

export default function HeroSection() {
	return (
		<Container id='hero-section-container' maxWidth='xl'>
			<Box id='hero-section'>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Box display={"flex"} width={"100%"}>
						<Image src='/images/logo_main.png' width={650} height={154} alt='hero' style={{ objectFit: "contain", width: "100%", height: "auto" }} />
					</Box>
					<Typography component={"h1"} fontSize={"1.5rem"} fontWeight={"regular"} mt={2} textAlign={"left"}>
						<Typography component={"span"} fontWeight={"bold"} color='primary' fontSize={"inherit"}>
							Главное событие рынка недвижимости
						</Typography>{" "}
						в самом западном регионе России.
					</Typography>
					<Divider />
					<Typography textAlign={"left"}>
						Гильдия риэлторов Калининграда приглашает вас на ежегодный форум, где мы обсудим будущее рынка, обменяемся лучшими практиками и найдём
						надёжных партнёров.
					</Typography>
					<Box id='hero-section-cards'>
						<Card variant='outlined' sx={{ borderRadius: "1rem", width: "100%" }}>
							<CardHeader
								title='23.07 - 26.07.2026'
								subheader='4 дня мероприятий'
								avatar={<CalendarMonth fontSize='large' color='primary' />}
								slotProps={{ title: { fontWeight: "bolder" } }}
							/>
						</Card>
						<Card variant='outlined' sx={{ borderRadius: "1rem", width: "100%" }}>
							<CardHeader
								title='Конференц-зал отеля Radisson Blu'
								subheader='Калининград, пл. Победы, 10'
								avatar={<PlaceOutlined fontSize='large' color='primary' />}
								slotProps={{ title: { fontWeight: "bolder" } }}
							/>
						</Card>
					</Box>
					<Box display={"flex"} flexDirection={"column"} mt={"auto"}>
						<Typography fontWeight={"regular"}>Организаторы:</Typography>
						<Stack direction={"row"} spacing={2} ml={"-0.5rem"}>
							<Image src='/images/rgr.png' alt='rgr' width={128} height={84} />
							<Image src='/images/grk.png' alt='grk' width={128} height={84} />
						</Stack>
					</Box>
				</Box>
				<RegistrationForm />
			</Box>
		</Container>
	);
}
