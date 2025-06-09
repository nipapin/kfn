import { AppBar, Box, Stack, Toolbar, Link } from "@mui/material";

import Image from "next/image";
import NextLink from "next/link";

export default function Navigation() {
	return (
		<AppBar elevation={1}>
			<Toolbar>
				<Box sx={{ "& img": { width: "100%", height: "auto" }, height: "100%", maxWidth: "80px", p: "0.75rem" }}>
					<NextLink href='/'>
						<Image src='/images/logo_nav.png' alt='logo' width={806} height={606} />
					</NextLink>
				</Box>
				<Stack direction={"row"} spacing={1} ml={"auto"}>
					<NextLink href='/business' passHref legacyBehavior>
						<Link component={"span"} sx={{ color: "secondary.main" }}>
							Деловая программа
						</Link>
					</NextLink>
					<NextLink href='/entertainment' passHref legacyBehavior>
						<Link component={"span"} sx={{ color: "secondary.main" }}>
							Развлекательная программа
						</Link>
					</NextLink>
					<NextLink href='/guests' passHref legacyBehavior>
						<Link component={"span"} sx={{ color: "secondary.main" }}>
							Приезжим
						</Link>
					</NextLink>
					<NextLink href='/partnership' passHref legacyBehavior>
						<Link component={"span"} sx={{ color: "secondary.main" }}>
							Стать партнером
						</Link>
					</NextLink>
					<NextLink href='/contacts' passHref legacyBehavior>
						<Link component={"span"} sx={{ color: "secondary.main" }}>
							Контакты
						</Link>
					</NextLink>
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
