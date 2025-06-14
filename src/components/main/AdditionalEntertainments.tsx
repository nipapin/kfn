import { ArrowForward, Description } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Paper, Stack, Typography } from "@mui/material";
import Title from "../Title";

const entertainments = [
	{
		id: 1,
		title: "Брокер тур «ЖК Прибалтики»",
		description: `
Исследуйте лучшие жилые комплексы курортных городов — ваши клиенты будут в восторге!
Программа тура:
📍 Светлогорск:
— Современные ЖК в шаге от Балтийского моря: виды, инфраструктура спа-отелей и променадов.  
— Квартиры с террасами и панорамным остеклением.  
📍 Зеленоградск:
— Объекты для ПМЖ и инвестиций: спрос растёт даже в межсезонье.  
📍 Балтийск:
— ЖК у моря с развитой транспортной логистикой: близость к порту, Калининграду.  
— Доступные цены на побережье с высоким потенциалом удорожания.  
⏰ Для кого: риэлторы, инвесторы, брокеры, которые хотят расширить портфель прибрежными объектами.  
Почему это выгодно?
✅ Эксклюзивный доступ: 10–12 ЖК, включая объекты в стадии сдачи «под ключ».  
✅ Личное общение с девелоперами: договоритесь о спецусловиях для своих клиентов.
        `,
		price: 500,
		image: "https://kfn39.ru/media/dop_offers/%D0%B1%D1%80%D0%BE%D0%BA%D0%B5%D1%80_%D1%82%D1%83%D1%80.jpg"
	},
	{
		id: 2,
		title: "Таинственный замок",
		description: `Приглашаем вас на уникальную экскурсию в загадочный замок рыцарей тевтонского ордена  — один из самых значимых исторических достопримечательностей региона. Этот величественный замок XIII века, с его ярким средневековым обликом, расскажет историю рыцарей, династических драм и исторических сражений.
Во время экскурсии вы насладитесь панорамными видами, прогуляетесь по внутренним помещениям замка, полным древних артефактов. В стоимость билета входят трансфер, экскурсия, интерактивные развлечения, такие как стрельба из лука и фаер-шоу, а также ужин на природе. 
Присоединяйтесь к нам и погружайтесь в атмосферу старины и увлекательных историй!
Автобус до мероприятия будет ждать Вас 6 августа в 18:00 у Radisson Blu Hotel`,
		price: 14000,
		image: "https://kfn39.ru/media/dop_offers/%D0%B7%D0%B0%D0%BC%D0%BE%D0%BA.jpg"
	},
	{
		id: 3,
		title: "Гала ужин",
		description: `Гала Ужин — это не только возможность насладиться изысканными блюдами, подготовленными шеф-поваром, но и уникальная платформа для обмена мнениями и идеями о будущем индустрии недвижимости. Этот вечер станет шикарным завершением насыщенного дня, полного интересных выступлений, панельных дискуссий и нетворкинга с лидерами отрасли.
В программе вечера вас ожидает не только кулинарный фурор, но и живое музыкальное сопровождение, позволяющее создать уютную и вдохновляющую атмосферу. Мы хотим, чтобы каждый из вас почувствовал себя частью этой значимой встречи и смог установить новые контакты, которые станут основанием для успешного сотрудничества в будущем.
Не упустите шанс стать частью этого незабываемого события, где вы сможете поделиться опытом, обсудить актуальные вопросы и просто насладиться компанией единомышленников.
Мероприятие начнется 7 августа в 19:00 в уютном ресторане «Усадьба»`,
		price: 16000,
		image: "https://kfn39.ru/media/dop_offers/%D1%83%D0%B6%D0%B8%D0%BD.jpg"
	}
];

const getFirstSentence = (description: string) => {
	const index_1 = description.indexOf(".");
	const index_2 = description.indexOf("!");
	const index_3 = description.indexOf("?");
	const index = Math.min(...[index_1, index_2, index_3].filter((index) => index > -1));
	return description.slice(0, index + 1);
};

function AdditionalEntertainments() {
	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "1200px", mx: "auto", height: "100%", py: 10 }}
		>
			<Title text='Дополнительные развлечения' />
			<Grid container spacing={2} columns={3} width={"100%"}>
				{entertainments.map((pack) => (
					<Grid key={pack.id} size={1}>
						<Card sx={{ borderRadius: "1rem", height: "100%", display: "flex", flexDirection: "column" }} variant='outlined'>
							<CardHeader
								title={pack.title}
								slotProps={{ title: { sx: { fontSize: "1.2rem", textTransform: "capitalize" } } }}
								subheader={`${pack.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}`}
							/>
							<CardMedia component={"img"} src={pack.image} alt={pack.title} sx={{ height: "200px" }} />
							<CardContent>{getFirstSentence(pack.description)}</CardContent>
							<CardActions sx={{ mt: "auto" }}>
								<Button variant='text' color='primary' endIcon={<ArrowForward />} sx={{ ml: "auto" }}>
									Подробнее
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default AdditionalEntertainments;
