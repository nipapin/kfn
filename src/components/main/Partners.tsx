"use client";

import { Add, Handshake } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import Title from "../shared/Title";
import PartnerCard from "../layout/PartnerCard";

export default function Partners() {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				maxWidth: "1200px",
				mx: "auto",
				py: isMobile ? "4rem" : "10rem",
				px: "1rem",
				pb: "4rem"
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
				<Title text='Партнёры' />
				<PartnerCard
					image={{
						src: "/images/baltia.png",
						width: 1099,
						height: 702,
						alt: "Балтия ремонт"
					}}
					name='Балтия ремонт'
					description={`Cервис по ремонту квартир под ключ: от проекта на бумаге до комплектации мебелью и текстилем. Компания уже более 5 лет создает комфорт и уют в квартирах и домах Калининграда и области.`}
					type='Официальный партнёр'
				/>
				<Box
					sx={{
						display: "flex",
						gap: 4,
						flexDirection: isMobile ? "column" : "row",
						"& img": { width: isMobile ? "100%" : "400px", height: "auto" }
					}}
				>
					<Typography fontSize={"1.2rem"}>
						<strong>Российская гильдия риэлторов</strong> — добровольное объединение профессиональных участников рынка недвижимости. Гильдия действует
						в соответствии с Федеральным законом «О некоммерческих организациях», другими законодательными и правовыми актами РФ, Уставом и иными
						внутренними нормативными документами организации.
					</Typography>
					<Image src={"/images/rgr-trimed.png"} width={1099} height={702} alt={"Гильдия"} />
				</Box>
				<Divider sx={{ my: 6 }} />
				<Box
					sx={{
						display: "flex",
						gap: 4,
						flexDirection: isMobile ? "column" : "row",
						"& img": { width: isMobile ? "100%" : "400px", height: "auto" }
					}}
				>
					<Typography fontSize={"1.2rem"}>
						<strong>Бэл девелопмент</strong> — профессиональная девелоперская компания полного цикла создана в 2002 году и уже более двух десятилетий
						строит высококлассные жилые и коммерческие объекты в России и странах СНГ
					</Typography>
					<Image src={"/images/bel.png"} width={1099} height={702} alt={"Балтия ремонт"} />
				</Box>
				{/* <Divider sx={{ my: 6 }} />
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Typography variant='h3' textAlign={"center"} fontSize={"2rem"}>
						Станьте нашим партнером
					</Typography>
					<Typography textAlign={"center"} mt={1} sx={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>
						{`Мы заинтересованы в сотрудничестве с компаниями, которые предлагают услуги, связанные с недвижимостью.`}
					</Typography>
					<Grid container spacing={2} columns={isMobile ? 1 : 3} my={4} width={"100%"}>
						{["Генеральный партнёр", "Стратегический партнёр", "Официальный партнёр"].map((type: string) => {
							return (
								<Grid key={type} size={1} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
									<Card variant='outlined' sx={{ width: "100%", borderRadius: "1rem" }}>
										<CardHeader title={type} slotProps={{ title: { sx: { textAlign: "center" } } }} />
										<CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, p: 0 }}>
											<Handshake sx={{ fontSize: "4rem" }} />
											<Typography textAlign={"center"} fontSize={"0.8rem"} sx={{ opacity: 0.5 }}>
												Здесь может быть размещен логотип Вашей компании
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							);
						})}
					</Grid>
					<NextLink href={"/partnership"} passHref>
						<Button variant='contained' color='primary' sx={{ mt: 4, width: "fit-content", mx: "auto" }} startIcon={<Add />} size={"large"}>
							Станьте нашим партнером
						</Button>
					</NextLink>
				</Box> */}
			</Box>
		</Box>
	);
}
