"use client";

import { Email, Menu, Phone, Telegram } from "@mui/icons-material";
import { Button, Drawer, IconButton, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";
import { VK } from "../icons/VK";

const menuItems = [
	{ title: "Деловая программа", href: "/program/business" },
	{ title: "Развлекательная программа", href: "/program/entertainment" },
	{ title: "Гостям", href: "/guests" },
	{ title: "Стать партнером", href: "/partnership" },
	{ title: "Контакты", href: "/contacts" }
];

export default function MobileDrawerMenu() {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton color='secondary' onClick={() => setOpen(true)} sx={{ ml: "auto" }}>
				<Menu />
			</IconButton>
			<Drawer open={open} onClose={() => setOpen(false)} anchor='right' sx={{ "& .MuiDrawer-paper": { backgroundColor: "primary.main", p: "1rem" } }}>
				<List>
					{menuItems.map((item, index) => (
						<NextLink href={item.href} passHref key={index}>
							<ListItemButton key={index} sx={{ textDecoration: "none", color: "white" }} onClick={handleClose}>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</NextLink>
					))}
				</List>
				<Paper
					variant='outlined'
					sx={{
						backgroundColor: "primary.main",
						p: "1rem",
						borderColor: "white",
						flexDirection: "column",
						display: "flex",
						borderRadius: "1rem",
						mt: "auto"
					}}
				>
					<Button
						variant='text'
						size='small'
						startIcon={<Email />}
						sx={{ color: "white", width: "fit-content" }}
						href='mailto:grkaliningrada@gmail.com'
					>
						grkaliningrada@gmail.com
					</Button>
					<Button variant='text' size='small' startIcon={<Phone />} sx={{ color: "white", width: "fit-content" }} href='tel:+79637382139'>
						+7 (963) 738-21-39
					</Button>
					<Button
						variant='text'
						size='small'
						startIcon={<Telegram />}
						sx={{ color: "white", width: "fit-content" }}
						href='https://t.me/+eb5NWF3qGdZkMzcy'
					>
						Телеграм
					</Button>
					<Button variant='text' size='small' startIcon={<VK />} sx={{ color: "white", width: "fit-content" }} href='https://vk.com/grkaliningrad'>
						ВКонтакте
					</Button>
				</Paper>
			</Drawer>
		</>
	);
}
