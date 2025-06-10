import { CalendarMonth, PlaceOutlined } from "@mui/icons-material";
import { Box, Card, CardHeader, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import RegistrationForm from "../RegistrationForm";

export default function HeroSection() {
	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "1400px",
				mx: "auto",
				height: "100%",
				display: "grid",
				gridTemplateColumns: { lg: "auto 600px", md: "1fr" },
				px: { lg: 0, md: 8 },
				gap: "8rem",
				py: 10
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
				<Box display={"flex"}>
					<Image src='/images/logo_main.png' width={650} height={154} alt='hero' style={{ objectFit: "contain", width: "100%", height: "auto" }} />
				</Box>
				<Typography component={"h1"} fontSize={"1.5rem"} fontWeight={"regular"} mt={2}>
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
				<Typography>Получите ценные консультации от федеральных бизнес-тренеров и найдите современные решения для актуальных вызовов.</Typography>
				<Stack direction='row' spacing={2} width={"100%"} my={"auto"}>
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
				</Stack>
				<Box display={"flex"} flexDirection={"column"} mt={"auto"}>
					<Typography fontWeight={"regular"}>Организаторы:</Typography>
					<Stack direction={"row"} spacing={2} ml={"-0.5rem"}>
						<Image src='/images/rgr.png' alt='rgr' width={128} height={84} />
						<Image src='/images/grk.png' alt='grk' width={128} height={84} />
					</Stack>
				</Box>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<RegistrationForm />
			</Box>
		</Box>
	);
}
