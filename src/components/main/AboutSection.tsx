import { Box, Container, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import Title from "../shared/Title";
import Carousel from "./Carousel";
import "@/styles/about.css";
import TelegramBanner from "../shared/TelegramBanner";

const keyTopics = [
	"Рынок недвижимости Калининградской области: итоги и прогнозы",
	"Эффективные продажи и Маркетинг 2026",
	"Инвестиционный клуб (управление и кейсы).",
	"Стратегии успеха в коммерческой недвижимости",
	"Искусство безопасной сделки: юридическая анатомия вторичного рынка.",
	"Воркшоп с психологом.",
	"Искусство равновесия: о безопасности и психологической устойчивости в сделках."
];

const audienceLines = [
	"Для риэлторов и брокеров — повышение квалификации и получение актуальной аналитики.",
	"Для девелоперов и застройщиков — понимание реального спроса и презентации новых проектов.",
	"Для инвесторов — поиск надёжных активов с высокой доходностью.",
	"Для представителей власти и банков — диалог с профессиональным сообществом.",
	"Для смежных специалистов — оценщиков, юристов, ипотечных брокеров."
];

const whyParticipate = [
	"Экспертность: спикеры — лидеры рынка Калининграда и приглашённые эксперты из Москвы, Санкт-Петербурга, Нижнего Новгорода, Казани, Тюмени и других регионов России.",
	"Нетворкинг: возможность лично пообщаться с ключевыми игроками рынка в неформальной обстановке.",
	"Статус: организатор мероприятия — Гильдия риэлторов Калининграда. Мы объединяем лучших профессионалов региона с многолетней репутацией.",
	"Практическая польза: никакой «воды», только конкретные кейсы, цифры и прогнозы."
];

const sectionTitleSx = { fontWeight: 600, fontSize: { xs: "1.125rem", md: "1.35rem" }, mb: 2, color: "primary.main" };

export default function AboutSection() {
	return (
		<Container id='about-section-container'>
			<Box id='about-section-content'>
				<Title text='О Форуме' />
				<TelegramBanner />
				<Stack direction='column' gap={{ xs: 4, md: 6 }} id='about-section-cards' sx={{ mt: { xs: 2, md: 4 } }}>
					<Box>
						<Typography sx={sectionTitleSx}>Ключевые темы форума 2026</Typography>
						<List dense disablePadding sx={{ listStyleType: "disc", pl: 2, "& .MuiListItem-root": { display: "list-item" } }}>
							{keyTopics.map((topic) => (
								<ListItem key={topic} disablePadding sx={{ py: 0.5 }}>
									<ListItemText primary={topic} primaryTypographyProps={{ variant: "body1", sx: { textWrap: "balance" } }} />
								</ListItem>
							))}
						</List>
					</Box>
					<Box>
						<Typography sx={sectionTitleSx}>Для кого этот форум?</Typography>
						<Stack component='ul' gap={1.5} sx={{ m: 0, pl: 2.5 }}>
							{audienceLines.map((line) => (
								<Typography key={line} component='li' variant='body1' sx={{ textWrap: "balance" }}>
									{line}
								</Typography>
							))}
						</Stack>
					</Box>
					<Box>
						<Typography sx={sectionTitleSx}>Почему стоит принять участие?</Typography>
						<Stack component='ol' gap={1.5} sx={{ m: 0, pl: 2.5 }}>
							{whyParticipate.map((line) => (
								<Typography key={line} component='li' variant='body1' sx={{ textWrap: "balance" }}>
									{line}
								</Typography>
							))}
						</Stack>
					</Box>
				</Stack>
			</Box>
			<Box id='about-section-join-us'>
				<Typography textAlign={"center"} fontSize={{ lg: "1.25rem", xs: "1rem" }} fontWeight={600} component='p' sx={{ mb: 1 }}>
					Регистрация открыта
				</Typography>
				<Typography textAlign={"center"} fontSize={{ lg: "1.1rem", xs: "0.95rem" }} fontWeight={400} component='p'>
					Количество мест в зале ограничено. Успейте забронировать участие по специальной цене раннего бронирования — форма регистрации на главной странице.
				</Typography>
			</Box>
			<Box
				sx={{
					width: "100%",
					maxWidth: "1400px",
					mx: "auto",
					height: "100%"
				}}
			>
				<Carousel />
			</Box>
		</Container>
	);
}
