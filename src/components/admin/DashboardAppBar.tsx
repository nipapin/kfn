import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Public } from "@mui/icons-material";
import NextLink from "next/link";

export default function DashboardAppBar() {
	return (
		<AppBar position='static' sx={{ mb: 3 }}>
			<Toolbar sx={{ maxWidth: "xl", margin: "0 auto", width: "100%" }}>
				<AssignmentIcon sx={{ mr: 2 }} />
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					Dashboard - Заявки пользователей
				</Typography>
				<NextLink href='/' passHref>
					<IconButton color='secondary' sx={{ ml: "auto" }} title='На главную'>
						<Public />
					</IconButton>
				</NextLink>
			</Toolbar>
		</AppBar>
	);
}
