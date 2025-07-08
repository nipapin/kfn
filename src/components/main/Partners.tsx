"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import PartnerCard from "../layout/PartnerCard";
import Title from "../shared/Title";

const partners = [
	{
		image: {
			src: "/images/baltia.png",
			width: 1648,
			height: 498,
			alt: "Балтия ремонт"
		},
		name: "Балтия ремонт",
		description:
			"Cервис по ремонту квартир под ключ: от проекта на бумаге до комплектации мебелью и текстилем. Компания уже более 5 лет создает комфорт и уют в квартирах и домах Калининграда и области."
	},
	{
		image: {
			src: "/images/rgr-trimed.png",
			width: 884,
			height: 342,
			alt: "Российская гильдия риэлторов"
		},
		name: "Российская гильдия риэлторов",
		description:
			"Добровольное объединение профессиональных участников рынка недвижимости. Гильдия действует в соответствии с Федеральным законом «О некоммерческих организациях», другими законодательными и правовыми актами РФ, Уставом и иными внутренними нормативными документами организации."
	},
	{
		image: {
			src: "/images/bel.png",
			width: 1392,
			height: 1160,
			alt: "Бэл девелопмент"
		},
		name: "Бэл девелопмент",
		description:
			"Профессиональная девелоперская компания полного цикла создана в 2002 году и уже более двух десятилетий строит высококлассные жилые и коммерческие объекты в России и странах СНГ"
	},
	{
		image: {
			src: "/images/tvn.jpg",
			width: 556,
			height: 376,
			alt: "Группа компаний «ТВН»"
		},
		name: "Группа компаний «ТВН»",
		description:
			"Динамично развивающийся застройщик в Калининграде и области с 2019 года. За это время группа компаний «ТВН» успешно реализовали несколько жилых комплексов и продолжают расширять портфель проектов, включая новостройки «комфорт-класса» в г. Балтийске и г. Светлогорске."
	},
	{
		image: {
			src: "/images/re.png",
			width: 1000,
			height: 919,
			alt: "Русская Европа"
		},
		name: "Русская Европа",
		description:
			"Компания строит ЭКОквартал «Русская Европа» в Калининграде — первый в России «Счастливый город». Это уникальный проект, который объединяет экологичность, инновационные технологии и комфортную жизнь, с акцентом на гармонию с природой и создание благоприятной атмосферы для жителей."
	}
];

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
				{partners.map((partner, index, self) => {
					const isLast = index === self.length - 1;
					return (
						<PartnerCard key={partner.name} image={partner.image} name={partner.name} description={partner.description} type='' divider={!isLast} />
					);
				})}
				{/* <PartnerCard
					image={{
						src: "/images/baltia.png",
						width: 1099,
						height: 702,
						alt: "Балтия ремонт"
					}}
					name='Балтия ремонт'
					description={`Cервис по ремонту квартир под ключ: от проекта на бумаге до комплектации мебелью и текстилем. Компания уже более 5 лет создает комфорт и уют в квартирах и домах Калининграда и области.`}
					type=''
				/>
				<PartnerCard
					image={{
						src: "/images/rgr-trimed.png",
						width: 1099,
						height: 702,
						alt: "Российская гильдия риэлторов"
					}}
					name='Российская гильдия риэлторов'
					description={`Добровольное объединение профессиональных участников рынка недвижимости. Гильдия действует в соответствии с Федеральным законом «О некоммерческих организациях», другими законодательными и правовыми актами РФ, Уставом и иными внутренними нормативными документами организации.`}
					type=''
				/>
				<PartnerCard
					image={{
						src: "/images/bel.png",
						width: 1099,
						height: 702,
						alt: "Бэл девелопмент"
					}}
					name='Бэл девелопмент'
					description={`Профессиональная девелоперская компания полного цикла создана в 2002 году и уже более двух десятилетий строит высококлассные жилые и коммерческие объекты в России и странах СНГ`}
					type=''
				/> */}
			</Box>
		</Box>
	);
}
