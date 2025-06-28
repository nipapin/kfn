import {
	AutoAwesome,
	CalendarMonthOutlined,
	Circle,
	CorporateFare,
	Email,
	GroupOutlined,
	HandshakeOutlined,
	Phone,
	PlaceOutlined,
	TrackChangesOutlined,
	TrendingUp
} from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Container,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
	Typography
} from "@mui/material";
import "@/styles/partners.css";

export default async function GuestsPage() {
	return (
		<Container id='partners-container'>
			<Box id='partners-container-header'>
				<Chip
					label={
						<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
							<HandshakeOutlined /> Партнерское предложение
						</Typography>
					}
					variant='filled'
					color='primary'
				/>
				<Typography id='partners-container-header-title' variant='h1'>
					Станьте{" "}
					<Typography component={"span"} color='primary'>
						Партнером
					</Typography>
					<br />
					уникального события года
				</Typography>
				<Box id='partners-container-header-divider' />
				<Typography id='partners-container-header-subtitle'>«Калининградского форума недвижимости: Новые Горизонты»</Typography>
				<Box id='partners-container-header-chips'>
					<Chip
						label={
							<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
								<CorporateFare fontSize='small' />
								Недвижимость
							</Typography>
						}
						color='primary'
					/>
					<Chip
						label={
							<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
								<TrendingUp fontSize='small' />
								Инвестиции
							</Typography>
						}
						color='primary'
					/>
					<Chip
						label={
							<Typography sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
								<AutoAwesome fontSize='small' />
								Инновации
							</Typography>
						}
						color='primary'
					/>
				</Box>
			</Box>
			<Stack direction={"column"} gap={"2rem"} width={"100%"} p={{ lg: "0", xs: "1rem" }}>
				<Card id='partners-container-card' variant='outlined'>
					<CardHeader
						avatar={
							<Box
								sx={{
									backgroundColor: "primary.main",
									borderRadius: "0.5rem",
									p: "0.5rem",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<CalendarMonthOutlined color='secondary' sx={{ fontSize: "2.5rem" }} />
							</Box>
						}
						title={
							<Typography fontWeight={500} fontSize={"2rem"}>
								Уникальная возможность
							</Typography>
						}
						subheader={<Typography color={"primary.main"}>Присоединяйтесь к ведущему событию отрасли</Typography>}
					/>
					<CardContent>
						<Typography>
							Мы приглашаем вас принять участие в качестве Партнера уникального события года в сфере недвижимости — «Калининградского форума
							недвижимости: Новые Горизонты». Это мероприятие станет важнейшей площадкой для обмена опытом, установления деловых связей и продвижения
							инновационных решений в области недвижимости, финансов, туризма и технологий.
						</Typography>
						<Paper
							variant='outlined'
							sx={{
								p: "1rem",
								borderRadius: "0.5rem",
								mt: "1rem",
								borderLeftColor: "primary.main",
								borderLeftWidth: "5px",
								borderColor: "primary.main"
							}}
						>
							<Typography color={"primary.main"} fontWeight={500}>
								Организатор мероприятия - СОЮЗ «ГИЛЬДИЯ РИЭЛТОРОВ КАЛИНИНГРАДА»
							</Typography>
						</Paper>
					</CardContent>
				</Card>
				<Box id='partners-container-cards'>
					<Grid size={1}>
						<Paper
							sx={{
								borderRadius: "1rem",
								display: "flex",
								flexDirection: "column",
								gap: "1rem",
								p: "2rem 1rem",
								height: "100%",
								backgroundColor: "primary.main"
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									p: "1rem",
									borderRadius: "99rem",
									backgroundColor: "secondary.main",
									width: "fit-content",
									mx: "auto"
								}}
							>
								<GroupOutlined sx={{ fontSize: "2rem", color: "primary.main" }} />
							</Box>
							<Box sx={{ p: "1rem", color: "white" }}>
								<Typography fontWeight={700} fontSize={"2rem"} textAlign={"center"}>
									800+
								</Typography>
								<Typography fontWeight={500} fontSize={"1rem"} textAlign={"center"}>
									Профессионалов рынка недвижимости
								</Typography>
								<Typography sx={{ fontSize: "0.875rem", textAlign: "center", opacity: 0.5, mt: "0.5rem" }}>
									из Калининградской области и регионов России
								</Typography>
							</Box>
						</Paper>
					</Grid>
					<Grid size={1}>
						<Paper
							sx={{
								borderRadius: "1rem",
								display: "flex",
								flexDirection: "column",
								gap: "1rem",
								p: "2rem 1rem",
								height: "100%",
								backgroundColor: "primary.main"
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									p: "1rem",
									borderRadius: "99rem",
									backgroundColor: "secondary.main",
									width: "fit-content",
									mx: "auto"
								}}
							>
								<CorporateFare sx={{ fontSize: "2rem", color: "primary.main" }} />
							</Box>
							<Box sx={{ p: "1rem", color: "white" }}>
								<Typography fontWeight={700} fontSize={"2rem"} textAlign={"center"}>
									2025
								</Typography>
								<Typography fontWeight={500} fontSize={"1rem"} textAlign={"center"}>
									Актуальные вопросы рынка
								</Typography>
								<Typography sx={{ fontSize: "0.875rem", textAlign: "center", opacity: 0.5, mt: "0.5rem" }}>
									современные тренды и перспективы
								</Typography>
							</Box>
						</Paper>
					</Grid>
					<Grid size={1}>
						<Paper
							sx={{
								borderRadius: "1rem",
								display: "flex",
								flexDirection: "column",
								gap: "1rem",
								p: "2rem 1rem",
								height: "100%",
								backgroundColor: "primary.main"
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									p: "1rem",
									borderRadius: "99rem",
									backgroundColor: "secondary.main",
									width: "fit-content",
									mx: "auto"
								}}
							>
								<TrackChangesOutlined sx={{ fontSize: "2rem", color: "primary.main" }} />
							</Box>
							<Box sx={{ p: "1rem", color: "white" }}>
								<Typography fontWeight={700} fontSize={"2rem"} textAlign={"center"}>
									КФН
								</Typography>
								<Typography fontWeight={500} fontSize={"1rem"} textAlign={"center"}>
									Это широкий охват аудитории
								</Typography>
								<Typography sx={{ fontSize: "0.875rem", textAlign: "center", opacity: 0.5, mt: "0.5rem" }}>
									частные инвесторы и застройщики
								</Typography>
							</Box>
						</Paper>
					</Grid>
				</Box>
				<Card sx={{ p: { lg: "2rem", xs: "1rem" }, borderRadius: "1rem" }} variant='outlined'>
					<CardHeader
						avatar={
							<Box
								sx={{
									backgroundColor: "primary.main",
									borderRadius: "0.5rem",
									p: "0.5rem",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<TrendingUp color='secondary' sx={{ fontSize: "2.5rem" }} />
							</Box>
						}
						title={
							<Typography fontWeight={500} fontSize={{ lg: "2rem", xs: "1rem" }}>
								Ключевые темы форума
							</Typography>
						}
						subheader={<Typography color={"primary.main"}>Актуальные вопросы и перспективы развития</Typography>}
					/>
					<CardContent>
						<Grid container columns={{ lg: 2, xs: 1 }}>
							<Grid size={1}>
								<List disablePadding dense>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Ситуация в сфере недвижимости и перспективы трансформации' />
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Ключевые векторы развития рынка и риэлторского бизнеса' />
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Инвестиционные тренды и приоритетные рыночные сегменты' />
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Курортная недвижимость и новые технологии' />
									</ListItem>
								</List>
							</Grid>
							<Grid size={1}>
								<List disablePadding dense>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Правовые аспекты и цифровые инновации' />
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Сопровождение и совершения сделок' />
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Ипотечные программы и инструменты финансирования' />
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ minWidth: "1rem" }}>
											<Circle sx={{ fontSize: "0.5rem" }} />
										</ListItemIcon>
										<ListItemText primary='Управление недвижимостью' />
									</ListItem>
								</List>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				<Card sx={{ p: { lg: "2rem", xs: "1rem" }, borderRadius: "1rem" }} variant='outlined'>
					<CardHeader
						avatar={
							<Box
								sx={{
									backgroundColor: "primary.main",
									borderRadius: "0.5rem",
									p: "0.5rem",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<PlaceOutlined color='secondary' sx={{ fontSize: "2.5rem" }} />
							</Box>
						}
						title={
							<Typography fontWeight={500} fontSize={{ lg: "2rem", xs: "1rem" }}>
								Участие представителей власти
							</Typography>
						}
						subheader={<Typography color={"primary.main"}>Высокий уровень мероприятия</Typography>}
					/>
					<CardContent>
						<Typography>
							Среди участников КФН будут представители Правительства Калининградской области, органов исполнительной власти Калининградской области,
							Управления Росреестра по Калининградской области, Нотариальной палаты Калининградской области, Отдела опеки и попечительства над
							несовершеннолетними комитета по социальной политике администрации городского округа «Город Калининград» и др.
						</Typography>
					</CardContent>
				</Card>
				<Paper
					elevation={0}
					sx={{
						backgroundColor: "primary.main",
						color: "white",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						p: "1rem",
						borderRadius: "1rem"
					}}
				>
					<HandshakeOutlined color='secondary' sx={{ fontSize: "2.5rem" }} />
					<Typography textAlign={"center"} fontSize={"1.5rem"} fontWeight={500}>
						Вопросы участия в качестве Партнера
					</Typography>
					<Box sx={{ width: "100px", height: "5px", backgroundColor: "white", mt: "0.5rem" }} />
					<Typography fontSize={"1.25rem"} fontWeight={500} mt={"2rem"}>
						Борсиев Константин Валерьевич
					</Typography>
					<Typography fontSize={"1rem"} fontWeight={300}>
						Координатор партнерских отношений
					</Typography>
					<Box width={"100%"}>
						<Paper
							variant='outlined'
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.5rem",
								mt: "0.5rem",
								p: "0.5rem 4rem",
								backgroundColor: "primary.main",
								color: "white",
								borderColor: "white",
								borderRadius: "0.5rem"
							}}
						>
							<Phone />
							+7 (921) 851-95-19
						</Paper>
						<Paper
							variant='outlined'
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.5rem",
								mt: "0.5rem",
								p: "0.5rem 4rem",
								backgroundColor: "primary.main",
								color: "white",
								borderColor: "white",
								borderRadius: "0.5rem"
							}}
						>
							<Email />
							grkaliningrad@gmail.com
						</Paper>
						<Stack direction={"row"} gap={"1rem"} justifyContent={"center"} width={"100%"}>
							<Button href={"tel:+79218519519"} variant='contained' color='secondary' sx={{ mt: "1rem", borderRadius: "0.5rem" }} fullWidth>
								Позвонить
							</Button>
							<Button
								href={"mailto:grkaliningrad@gmail.com"}
								variant='outlined'
								color='secondary'
								sx={{ mt: "1rem", borderRadius: "0.5rem" }}
								fullWidth
							>
								Написать
							</Button>
						</Stack>
					</Box>
				</Paper>
			</Stack>
		</Container>
	);
}
