import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { Suspense } from "react";
import MobileDrawerMenu from "./MobileDrawerMenu";

export default function MobileNavigation() {
	return (
		<div id='mobile-navigation'>
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
			<Suspense
				fallback={
					<IconButton>
						<Menu />
					</IconButton>
				}
			>
				<MobileDrawerMenu />
			</Suspense>
		</div>
	);
}
