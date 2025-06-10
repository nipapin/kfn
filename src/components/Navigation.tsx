import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";

import Image from "next/image";
import NextLink from "next/link";
import CompoundMenuItem from "./CompoundMenuItem";
import TopNavigation from "./TopNavigation";
import RegistrationButton from "./RegistrationButton";
import ModalRegistration from "./ModalRegistration";

export default function Navigation() {
	return (
		<AppBar elevation={1}>
			<Toolbar id='app-bar' sx={{ display: "flex", flexDirection: "column" }} disableGutters>
				<TopNavigation />
				<Box sx={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "1400px", mx: "auto" }}>
					<Box
						sx={{
							"& img": { width: "100%", height: "auto" },
							height: "100%",
							maxWidth: "80px",
							p: "1rem"
						}}
					>
						<NextLink href='/'>
							<Image src='/images/logo_nav.png' alt='logo' width={806} height={606} className='logo' />
						</NextLink>
					</Box>
					<Stack
						direction={"row"}
						alignItems={"center"}
						spacing={4}
						ml={"auto"}
						sx={{
							"& a": { textDecoration: "none" },
							"&>a>p": { color: "secondary.main", fontWeight: "400", transition: "all 0.3s" },
							"&>a>p:hover": { color: "warning.main" }
						}}
					>
						<CompoundMenuItem
							title='Программа'
							items={[
								{ title: "Деловая", href: "/business" },
								{ title: "Развлекательная", href: "/entertainment" }
							]}
						/>
						<NextLink href='/guests' passHref>
							<Typography>Гостям</Typography>
						</NextLink>
						<NextLink href='/partnership' passHref>
							<Typography>Стать партнером</Typography>
						</NextLink>
						<NextLink href='/contacts' passHref>
							<Typography>Контакты</Typography>
						</NextLink>
						<ModalRegistration buttonProps={{ variant: "contained", color: "secondary", sx: { color: "primary.main" } }} hideOnScroll={true} />
					</Stack>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
