"use client";

import { List, ListItemText, ListItem, Paper, ListItemButton, ListItemIcon } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CelebrationIcon from "@mui/icons-material/Celebration";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{ href: "/dashboard/applications", label: "Заявки", icon: <AssignmentIcon />, disabled: false },
	{ href: "/dashboard/packages", label: "Тарифы", icon: <LocalOfferIcon />, disabled: false },
	{ href: "/dashboard/program", label: "Программа", icon: <EventIcon />, disabled: false },
	{ href: "/dashboard/entertainments", label: "Мероприятия", icon: <CelebrationIcon />, disabled: false },
	{ href: "/dashboard/tours", label: "Туры", icon: <DirectionsBusIcon />, disabled: false },
	{ href: "/dashboard/partners", label: "Партнёры", icon: <HandshakeIcon />, disabled: false }
];

export default function DashboardSidebar() {
	const pathname = usePathname();
	return (
		<Paper sx={{ borderRadius: "1rem", height: "fit-content", padding: "1rem", "& a": { textDecoration: "none", color: "inherit", width: "100%" } }}>
			<List disablePadding>
				{items.map((item) => {
					const selected = pathname === item.href;
					const inner = (
						<ListItemButton sx={{ borderRadius: "0.5rem" }} disabled={item.disabled} selected={selected}>
							<ListItemIcon sx={{ minWidth: "2rem" }}>{item.icon}</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItemButton>
					);
					return (
						<ListItem key={item.href} disablePadding>
							{item.disabled ? (
								inner
							) : (
								<NextLink href={item.href} passHref>
									{inner}
								</NextLink>
							)}
						</ListItem>
					);
				})}
			</List>
		</Paper>
	);
}
