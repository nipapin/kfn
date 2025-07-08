"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import PartnerCard from "../layout/PartnerCard";
import Title from "../shared/Title";

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
				/>
			</Box>
		</Box>
	);
}
