import { Box, Typography } from "@mui/material";

export default function Footer() {
	return (
		<Box component='footer' sx={{ backgroundColor: "primary.main", color: "white" }}>
			<Box sx={{ maxWidth: "1200px", margin: "0 auto", py: 4 }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
					<Box>
						<Typography variant='h6' fontWeight='bold' mb={1}>
							Организаторы
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Российская гильдия риэлторов
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Гильдия риэлторов Калининградской области
						</Typography>
					</Box>
					<Box>
						<Typography variant='h6' fontWeight='bold' mb={1}>
							Контакты
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Телефон: +7 (4012) 123-456
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Email: grkaliningrada@gmail.com
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Сайт: grk39.ru
						</Typography>
					</Box>
					<Box>
						<Typography variant='h6' fontWeight='bold' mb={1}>
							Адрес
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Калининград, пл. Победы, 10
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Radisson Blu Hotel
						</Typography>
					</Box>
				</Box>
				<Box sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
					<Typography variant='body2' sx={{ opacity: 0.6 }}>
						© 2024 Все права защищены
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
