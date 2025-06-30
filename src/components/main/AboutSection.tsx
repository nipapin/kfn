import { Box, Button, Container, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import Title from "../shared/Title";
import Carousel from "./Carousel";
import "@/styles/about.css";
import { Telegram } from "@mui/icons-material";
import NextLink from "next/link";
import TelegramBanner from "../shared/TelegramBanner";

const cards = [
	{
		id: 1,
		text: "Мы предложим уникальные методики по созданию и монетизации личного бренда, а также обсудим клиентоориентированность, юридические аспекты сделок и инструменты для повышения результативности работы застройщиков и риэлторов",
		images: ["/images/spotlight-foto1.jpg"]
	},
	{
		id: 2,
		text: "На форуме вы ознакомитесь с инновациями и успешными кейсами от ведущих специалистов, которые поделятся своим опытом",
		images: ["/images/spotlight-foto5.jpg"]
	},
	{
		id: 3,
		text: "Это ваша возможность заглянуть в будущее недвижимости и стать частью крупнейшего события в Северо-Западном и Центральном округе России",
		images: ["/images/spotlight-foto3.jpg"]
	}
];

export default function AboutSection() {
	return (
		<Container id='about-section-container'>
			<Box id='about-section-content'>
				<Title text='О Форуме' />
				<TelegramBanner />
				<Stack direction={"column"} gap={16} id='about-section-cards'>
					{cards.map((card, index) => {
						const even = index % 2 !== 0;
						return (
							<Box key={index} id={even ? "about-section-card-even" : "about-section-card"}>
								<Typography id='about-section-card-text'>{card.text}</Typography>
								{card.images.map((image, index) => (
									<Image id='about-section-card-image' key={index} src={image} alt={`image-${index}`} width={500} height={500} />
								))}
							</Box>
						);
					})}
				</Stack>
			</Box>
			<Box id='about-section-join-us'>
				<Typography textAlign={"center"} fontSize={{ lg: "1.5rem", xs: "1rem" }} fontWeight={500}>
					Присоединяйтесь к форуму в Калининграде и откройте новые горизонты для вашего бизнеса!
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
