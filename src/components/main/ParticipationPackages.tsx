"use client";

import { Check, Close } from "@mui/icons-material";
import { Box, List, ListItemText, ListItem, Paper, Stack, Typography, ListItemIcon, Divider, useMediaQuery, useTheme } from "@mui/material";
import ModalRegistration from "../shared/ModalRegistration";
import Title from "../shared/Title";

const packages = [
	{
		id: 1,
		title: "Базовый",
		price: 2500,
		benefit: [
			{ available: true, label: "Выставка застройщиков" },
			{ available: true, label: "Пленарное заседание" },
			{ available: true, label: "Раздаточные материалы" },
			{ available: true, label: "Образовательные секции" },
			{ available: true, label: "Квест в зоне выставки" },
			{ available: false, label: "Путешествие в загадочный замок тевтонского ордена" },
			{ available: false, label: "Доступ в ВИП зону" },
			{ available: false, label: "Фуршет в ВИП зоне" },
			{ available: false, label: "Гала ужин" }
		],
		vip: false
	},
	{
		id: 2,
		title: "Премьер",
		price: 15000,
		benefit: [
			{ available: true, label: "Выставка застройщиков" },
			{ available: true, label: "Пленарное заседание" },
			{ available: true, label: "Раздаточные материалы" },
			{ available: true, label: "Образовательные секции" },
			{ available: true, label: "Квест в зоне выставки" },
			{ available: true, label: "Путешествие в загадочный замок тевтонского ордена" },
			{ available: false, label: "Доступ в ВИП зону" },
			{ available: false, label: "Фуршет в ВИП зоне" },
			{ available: false, label: "Гала ужин" }
		],
		vip: false
	},
	{
		id: 3,
		title: "VIP",
		price: 30000,
		benefit: [
			{ available: true, label: "Выставка застройщиков" },
			{ available: true, label: "Пленарное заседание" },
			{ available: true, label: "Раздаточные материалы" },
			{ available: true, label: "Образовательные секции" },
			{ available: true, label: "Квест в зоне выставки" },
			{ available: true, label: "Путешествие в загадочный замок тевтонского ордена" },
			{ available: true, label: "Доступ в ВИП зону" },
			{ available: true, label: "Фуршет в ВИП зоне" },
			{ available: true, label: "Гала ужин" }
		],
		vip: true
	}
];

export default function ParticipationPackages() {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));
	return (
		<Box id='tarrifs' sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "1200px", mx: "auto", py: "6rem", px: "1rem" }}>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Title text='Тарифы участников' />
				<Stack direction={isMobile ? "column" : "row"} spacing={2}>
					{packages.map((pack) => (
						<Paper
							variant='outlined'
							key={pack.id}
							sx={{ width: "100%", borderRadius: 4, padding: 3, borderWidth: pack.vip ? 4 : 1, borderColor: pack.vip ? "primary.main" : "gray.300" }}
						>
							<Typography variant='h3' fontSize={"1.75rem"} textAlign={"center"} fontWeight={"regular"}>
								{pack.title}
							</Typography>
							<Typography variant='h3' fontSize={"2rem"} textAlign={"center"} fontWeight={"bold"} mt={1}>
								{pack.price.toLocaleString("ru", { style: "currency", currency: "RUB", maximumFractionDigits: 0 })}
							</Typography>
							<Divider sx={{ my: 2 }} />
							<Typography fontSize={"1rem"} my={1}>
								Включает:
							</Typography>
							<List disablePadding dense>
								{pack.benefit.map((benefit) => (
									<ListItem key={benefit.label} disableGutters sx={{ opacity: benefit.available ? 1 : 0.5 }}>
										<ListItemIcon>{benefit.available ? <Check /> : <Close />}</ListItemIcon>
										<ListItemText primary={benefit.label} sx={{ textWrap: "balance" }} />
									</ListItem>
								))}
							</List>
						</Paper>
					))}
				</Stack>
				<Typography textAlign='center' sx={{ mt: 3, maxWidth: "36rem", mx: "auto", px: 1 }} color='text.secondary'>
					Для членов Гильдии риэлторов Калининграда — скидка 20%. Программа форума и наполнение билетов будут дополняться — следите за обновлениями.
				</Typography>
				<ModalRegistration hideOnScroll={false} />
			</Box>
		</Box>
	);
}
