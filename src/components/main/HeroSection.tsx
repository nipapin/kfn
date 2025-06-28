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
						Ваш ключ к{" "}
						<Typography component={"span"} fontWeight={"bold"} color='primary' fontSize={"inherit"}>
							эксклюзивной информации
						</Typography>{" "}
						и{" "}
						<Typography component={"span"} fontWeight={"bold"} color='primary' fontSize={"inherit"}>
							новым возможностям
						</Typography>{" "}
						в сфере недвижимости.
					</Typography>
					<Divider />
					<Typography textAlign={"left"}>
						Получите ценные консультации от федеральных бизнес-тренеров и найдите современные решения для актуальных вызовов.
					</Typography>
					<Box id='hero-section-cards'>
						<Card variant='outlined' sx={{ borderRadius: "1rem", width: "100%" }}>
							<CardHeader
								title='06.08 - 09.08.2025'
								subheader='4 дня мероприятий'
								avatar={<CalendarMonth fontSize='large' color='primary' />}
								slotProps={{ title: { fontWeight: "bolder" } }}
							/>
						</Card>
						<Card variant='outlined' sx={{ borderRadius: "1rem", width: "100%" }}>
							<CardHeader
								title='Radisson Blu Hotel'
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
