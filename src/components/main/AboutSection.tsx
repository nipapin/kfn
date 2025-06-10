"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Carousel from "./Carousel";

const cards = [
	{
		id: 1,
		text: "Мы предложим уникальные методики по созданию и монетизации личного бренда, а также обсудим клиентоориентированность, юридические аспекты сделок и инструменты для повышения результативности работы застройщиков и риэлторов",
		images: ["https://kfn39.ru/static/images/spotlight-foto1.png"]
	},
	{
		id: 2,
		text: "На форуме вы ознакомитесь с инновациями и успешными кейсами от ведущих специалистов, которые поделятся своим опытом",
		images: ["https://kfn39.ru/static/images/spotlight-foto5.png"]
	},
	{
		id: 3,
		text: "Это ваша возможность заглянуть в будущее недвижимости и стать частью крупнейшего события в Северо-Западном и Центральном округе России",
		images: ["https://kfn39.ru/static/images/spotlight-foto3.png"]
	}
];

export default function AboutSection() {
	const { palette } = useTheme();
	return (
		<>
			<Box
				sx={{
					width: "100%",
					maxWidth: "1400px",
					mx: "auto",
					height: "100%",
					py: 10
				}}
			>
				<Typography variant='h2' textAlign={"center"} mb={4} fontSize={"4rem"} fontWeight={"bold"}>
					О Форуме
				</Typography>
				<Stack direction={"column"} gap={16} mt={8}>
					{cards.map((card, index) => {
						const even = index % 2 !== 0;
						return (
							<Box
								display={"flex"}
								gap={2}
								key={card.id}
								alignItems={"center"}
								justifyContent={"space-between"}
								flexDirection={even ? "row-reverse" : "row"}
							>
								<Typography
									fontSize={"1.5rem"}
									fontWeight={"regular"}
									sx={{ textWrap: "balance" }}
									textAlign={even ? "end" : "start"}
									my='auto'
									width={"fit-content"}
								>
									{card.text}
								</Typography>
								<Box display={"grid"} gap={2} width={"100%"}>
									{card.images.map((image, index) => (
										<Image
											key={index}
											src={image}
											alt={`image-${index}`}
											width={500}
											height={500}
											style={{
												objectFit: "cover",
												width: "100%",
												height: "auto",
												borderRadius: "1rem",
												overflow: "hidden",
												boxShadow: `${even ? -20 : 20}px 20px 0 0 ${palette.primary.main}`
											}}
										/>
									))}
								</Box>
							</Box>
						);
					})}
				</Stack>
			</Box>
			<Box padding={10} bgcolor={"#f7f4e1"} color={"primary.main"}>
				<Typography
					textAlign={"center"}
					fontSize={"1.75rem"}
					maxWidth={"50%"}
					mx={"auto"}
					fontWeight={"medium"}
					lineHeight={1.1}
					textTransform={"uppercase"}
				>
					Присоединяйтесь к форуму в Калининграде и откройте новые горизонты для вашего бизнеса!
				</Typography>
			</Box>
			<Box
				sx={{
					width: "100%",
					maxWidth: "1400px",
					mx: "auto",
					height: "100%",
					py: 10
				}}
			>
				<Carousel />
			</Box>
		</>
	);
}
