import TelegramBanner from "@/components/shared/TelegramBanner";
import { AirportShuttle, CalendarMonthOutlined, CameraAltOutlined, HomeOutlined, PlaceOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";

export default async function GuestsPage() {
	return (
		<Container sx={{ py: { lg: "10rem", xs: "4rem" }, width: { lg: "1100px", xs: "100%" } }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					gap: "1rem",
					mb: "2rem",
					pt: "4rem",
					pb: { lg: "4rem", xs: 0 }
				}}
			>
				<Chip
					label={
						<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
							<PlaceOutlined /> Калининград {new Date().getFullYear()}
						</Typography>
					}
					variant='filled'
					color='primary'
				/>
				<Typography
					variant='h1'
					sx={{
						fontSize: { lg: "3rem", xs: "1.5rem" },
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "0.25rem",
						"& span": {
							fontSize: { lg: "3rem", xs: "1.5rem" },
							lineHeight: 1,
							fontWeight: 700
						}
					}}
				>
					<Typography component={"span"}>Уважаемые участники</Typography>
					<Typography component={"span"} color='primary'>
						Калининградского форума
					</Typography>
					<Typography component={"span"}>недвижимости!</Typography>
				</Typography>
				<Box
					sx={{
						width: { lg: "200px", xs: "100px" },
						height: { lg: "5px", xs: "3px" },
						backgroundColor: "primary.main",
						my: { lg: "2rem", xs: "1rem" }
					}}
				/>
			</Box>
			<TelegramBanner />
			<Stack direction={"column"} gap={{ lg: "2rem", xs: "1rem" }} width={"100%"} mt={"2rem"}>
				<Card sx={{ p: { lg: "2rem", xs: "1rem" }, borderRadius: "1rem" }} variant='outlined'>
					<CardHeader
						title={
							<Typography
								component='div'
								sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: { lg: "2rem", xs: "1rem" }, fontWeight: 500 }}
							>
								<Box
									sx={{
										backgroundColor: "primary.main",
										borderRadius: "50%",
										p: "0.5rem",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<CalendarMonthOutlined color='secondary' />
								</Box>
								Добро пожаловать!
							</Typography>
						}
					/>
					<CardContent>
						<Typography>
							Мы с большим удовольствием приветствуем вас на нашем масштабном мероприятии — Калининградском форуме недвижимости! Мы стремимся сделать
							ваше пребывание в Калининграде не только комфортным, но и незабываемым.
						</Typography>
					</CardContent>
				</Card>
				<Card sx={{ p: "2rem", borderRadius: "1rem" }} variant='outlined'>
					<CardHeader
						title={
							<Typography
								component='div'
								sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: { lg: "2rem", xs: "1rem" }, fontWeight: 500 }}
							>
								<Box
									sx={{
										backgroundColor: "primary.main",
										borderRadius: "50%",
										p: "0.5rem",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<PlaceOutlined color='secondary' />
								</Box>
								О Калининграде
							</Typography>
						}
					/>
					<CardContent>
						<Typography>
							Калининград — это город, который захватывает своей удивительной архитектурой, объединяющей исторические и современные элементы.
							Прогуливаясь по его улицам, вы сможете насладиться атмосферой, наполненной культурным наследием и уникальным стилем.
						</Typography>
					</CardContent>
				</Card>
				<Grid container spacing={{ lg: "2rem", xs: "1rem" }} width={"100%"} columns={{ lg: 2, xs: 1 }}>
					<Grid size={1}>
						<Card sx={{ p: "2rem", height: "100%", borderRadius: "1rem" }} variant='outlined'>
							<CardHeader
								title={
									<Typography
										component='div'
										sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: { lg: "2rem", xs: "1rem" }, fontWeight: 500 }}
									>
										<Box
											sx={{
												backgroundColor: "primary.main",
												borderRadius: "50%",
												p: "0.5rem",
												display: "flex",
												alignItems: "center",
												justifyContent: "center"
											}}
										>
											<HomeOutlined color='secondary' />
										</Box>
										Размещение
									</Typography>
								}
							/>
							<CardContent>
								<Typography>
									Чтобы ваше время в нашем городе прошло без забот, настоятельно рекомендуем заранее позаботиться о бронировании гостиниц, квартир или
									апартаментов.
								</Typography>
								<Typography fontSize={"0.875rem"} sx={{ opacity: 0.7, mt: "1rem" }}>
									Это позволит вам полностью сосредоточиться на обсуждениях и возможностях, которые предоставляет форум.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={1}>
						<Card sx={{ p: "2rem", height: "100%", borderRadius: "1rem" }} variant='outlined'>
							<CardHeader
								title={
									<Typography
										component='div'
										sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: { lg: "2rem", xs: "1rem" }, fontWeight: 500 }}
									>
										<Box
											sx={{
												backgroundColor: "primary.main",
												borderRadius: "50%",
												p: "0.5rem",
												display: "flex",
												alignItems: "center",
												justifyContent: "center"
											}}
										>
											<CameraAltOutlined color='secondary' />
										</Box>
										Экскурсии и аренда
									</Typography>
								}
							/>
							<CardContent>
								<Typography>
									Если вас интересует организация индивидуальной экскурсии по нашим историческим местам или аренда автомобиля, дайте нам знать.
								</Typography>
								<Typography color='primary.main' sx={{ display: "flex", alignItems: "center", gap: "0.5rem", mt: "1rem" }}>
									<AirportShuttle />
									Индивидуальный подход к каждому гостю
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
				<Paper
					variant='outlined'
					sx={{
						p: { lg: "2rem", xs: "1rem" },
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "1rem",
						borderColor: "primary.main"
					}}
				>
					<Typography fontSize={{ lg: "2rem", xs: "1.5rem" }} textAlign={"center"} fontWeight={500}>
						Мы всегда готовы помочь!
					</Typography>
					<Typography textAlign={"center"}>
						Мы с радостью окажем вам всю необходимую помощь, чтобы ваше пребывание стало действительно особенным и запоминающимся! По всем вопросам
						размещения, бронирования, заказа каршеринга и экскурсий можно связаться по телефону:
					</Typography>
				</Paper>
			</Stack>
		</Container>
	);
}
