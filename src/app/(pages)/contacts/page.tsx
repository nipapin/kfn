import { Phone } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardHeader, Container, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

const contacts = [
	{
		name: "Борсиев Константин Валерьевич",
		phone: "+7 (921) 851-95-19",
		avatar: "/images/contacts/borsiev.jpg"
	},
	{
		name: "Шавкуненко Диана Владимировна",
		phone: "+7 (963) 738-21-39",
		avatar: "/images/contacts/shavkunenko.jpg"
	},
	{
		name: "Капарулина Ирина Александровна",
		phone: "+7 (911) 070-86-28",
		avatar: "/images/contacts/kaparulina.jpeg"
	},
	{
		name: "Шелевер Светлана Николаевна",
		phone: "+7 (911) 457-28-53",
		avatar: "/images/contacts/shelever.jpg"
	},
	{
		name: "Ненахова Оксана Александровна",
		phone: "+7 (921) 103-41-41",
		avatar: "/images/contacts/nenahova.jpg"
	},
	{
		name: "Гилева Татьяна Павловна",
		phone: "+7 (962) 255-64-90",
		avatar: "/images/contacts/gileva.jpg"
	}
];

const extractTag = (name: string) => {
	const [_, firstname, middleName] = name.split(" ");
	return firstname.charAt(0) + middleName.charAt(0);
};

export default function ContactsPage() {
	return (
		<Container sx={{ py: { lg: "10rem", xs: "4rem" } }}>
			<Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: "1rem", mb: "2rem", py: "2rem" }}>
				<Typography
					variant='h1'
					sx={{
						fontSize: "3rem",
						fontWeight: 700,
						textAlign: "center"
					}}
				>
					Контакты
				</Typography>
				<Box sx={{ width: "200px", height: "5px", backgroundColor: "primary.main", mt: "1rem" }} />
				<Typography fontSize={{ lg: "1.5rem", xs: "1rem" }} textAlign={"center"} fontWeight={200} my={"1rem"}>
					Организационный комитет КФН: Новые Горизонты
				</Typography>
			</Box>
			<Grid container spacing={2} columns={{ lg: 3, xs: 1 }}>
				{contacts.map((contact) => (
					<Grid key={contact.name} size={1}>
						<Card sx={{ borderRadius: "1rem", p: "0.5rem", height: "100%" }} variant='outlined'>
							<CardHeader
								title={contact.name}
								subheader={contact.phone}
								avatar={
									<Avatar src={contact.avatar} sx={{ backgroundColor: "primary.main", width: "48px", height: "48px" }}>
										{extractTag(contact.name)}
									</Avatar>
								}
							/>
							{/* <CardContent /> */}
							<Divider />
							<CardActions sx={{ justifyContent: "flex-end" }}>
								<IconButton href={`tel:${contact.phone}`} sx={{ color: "primary.main" }}>
									<Phone />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>

			<Divider sx={{ my: "2rem" }} />
			<Stack direction={"column"} gap={"1rem"}>
				<Paper
					variant='outlined'
					sx={{
						p: "1rem",
						display: "flex",
						flexDirection: { lg: "row", xs: "column" },
						alignItems: "center",
						gap: "2rem",
						"& img": { width: "300px", height: "auto" }
					}}
				>
					<Image src={"/images/grk.png"} alt={"СОЮЗ «ГИЛЬДИЯ РИЭЛТОРОВ КАЛИНИНГРАДА»"} width={965} height={633} />
					<Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
						<Typography fontWeight={700}>Организатор:</Typography>
						<Typography>СОЮЗ «ГИЛЬДИЯ РИЭЛТОРОВ КАЛИНИНГРАДА»</Typography>
						<Divider />
						<Typography sx={{ textWrap: "balance" }}>
							СОЮЗ «ГИЛЬДИЯ РИЭЛТОРОВ КАЛИНИНГРАДА» это сообщество профессионалов рынка недвижимости. Целью ГРК является привлечение внимания общества
							к компаниям, работающим на рынке недвижимости Калининградской области, их работе по повышению уровня и качества, оказываемых на рынке
							недвижимости услуг, развитие в профессиональном сообществе стандартов качества
						</Typography>
					</Box>
				</Paper>
				<Paper
					variant='outlined'
					sx={{
						p: "1rem",
						display: "flex",
						flexDirection: { lg: "row", xs: "column" },
						alignItems: "center",
						gap: "2rem",
						"& img": { width: "300px", height: "auto" }
					}}
				>
					<Image src={"/images/rgr-trimed.png"} alt={"Российская Гильдия Риэлторов"} width={1099} height={702} />
					<Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
						<Typography fontWeight={700}>При поддержке:</Typography>
						<Typography>Российская Гильдия Риэлторов</Typography>
						<Divider />
						<Typography sx={{ textWrap: "balance" }}>
							РГР более 30 лет способствует развитию цивилизованного рынка недвижимости в РФ, формируя законодательную и нормативную базу, а также
							профессиональные стандарты. Гильдия поддерживает территориальные объединения, развивает деловые связи между членами и предоставляет
							услуги по обмену информацией и сотрудничеству.
						</Typography>
					</Box>
				</Paper>
			</Stack>
		</Container>
	);
}
