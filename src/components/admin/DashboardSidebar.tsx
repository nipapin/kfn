import { List, ListItemText, ListItem, Paper, ListItemButton, ListItemIcon } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NextLink from "next/link";

export default function DashboardSidebar() {
	return (
		<Paper sx={{ borderRadius: "1rem", height: "fit-content", padding: "1rem", "& a": { textDecoration: "none", color: "inherit", width: "100%" } }}>
			<List disablePadding>
				<ListItem disablePadding>
					<NextLink href='/dashboard/applications' passHref>
						<ListItemButton sx={{ borderRadius: "0.5rem" }}>
							<ListItemIcon sx={{ minWidth: "2rem" }}>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary='Заявки' />
						</ListItemButton>
					</NextLink>
				</ListItem>
				<ListItem disablePadding>
					<NextLink href='/dashboard/events' passHref>
						<ListItemButton sx={{ borderRadius: "0.5rem" }} disabled>
							<ListItemIcon sx={{ minWidth: "2rem" }}>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary='Мероприятия' />
						</ListItemButton>
					</NextLink>
				</ListItem>
				<ListItem disablePadding>
					<NextLink href='/dashboard/partners' passHref>
						<ListItemButton sx={{ borderRadius: "0.5rem" }} disabled>
							<ListItemIcon sx={{ minWidth: "2rem" }}>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary='Партнеры' />
						</ListItemButton>
					</NextLink>
				</ListItem>
			</List>
		</Paper>
	);
}
