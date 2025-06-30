"use client";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export default function Footer() {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));
	return (
		<Box component='footer' sx={{ backgroundColor: "primary.main", color: "white" }}>
			<Box sx={{ maxWidth: "1200px", margin: "0 auto", py: isMobile ? 4 : 8, px: isMobile ? "1rem" : "0" }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
					<Box>
						<Typography variant='h6' fontWeight={700} mb={1} fontSize={"1rem"}>
							Организатор:
							<br />
							СОЮЗ "ГИЛЬДИЯ РИЭЛТОРОВ КАЛИНИНГРАДА"
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							При поддержке:
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Российская Гильдия Риэлторов
						</Typography>
					</Box>
					<Box>
						<Typography variant='h6' fontWeight='bold' mb={1}>
							Контакты
						</Typography>
						<Typography variant='body2' sx={{ opacity: 0.8 }}>
							Телефон: +7 (963) 738-21-39
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
					<Typography variant='body2' sx={{ opacity: 0.6 }} textAlign={isMobile ? "center" : "left"}>
						© 2025 СОЮЗ «ГИЛЬДИЯ РИЭЛТОРОВ КАЛИНИНГРАДА». Все права защищены.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
