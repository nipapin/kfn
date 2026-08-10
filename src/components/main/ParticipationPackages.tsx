"use client";

import { ParticipationPackage } from "@/app/types/interfaces";
import { Check, Close } from "@mui/icons-material";
import { Box, List, ListItemText, ListItem, Paper, Stack, Typography, ListItemIcon, Divider, useMediaQuery, useTheme } from "@mui/material";
import ModalRegistration from "../shared/ModalRegistration";
import Title from "../shared/Title";

interface ParticipationPackagesProps {
	packages: ParticipationPackage[];
}

export default function ParticipationPackages({ packages }: ParticipationPackagesProps) {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));

	if (!packages || packages.length === 0) return null;

	return (
		<Box id='tarrifs' sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "1200px", mx: "auto", py: "6rem", px: "1rem" }}>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Title text='Тарифы участников' />
				<Stack direction={isMobile ? "column" : "row"} spacing={2}>
					{packages.map((pack) => (
						<Paper
							variant='outlined'
							key={pack.id ?? pack.title}
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
								{pack.benefits.map((benefit) => (
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
