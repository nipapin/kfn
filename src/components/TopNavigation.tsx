"use client";

import { Email, Phone, Telegram } from "@mui/icons-material";
import { Button, Box, IconButton, Collapse } from "@mui/material";
import { useScrollTrigger } from "@mui/material";
import React from "react";
import { VK } from "./icons/VK";

function TopNavigation() {
	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 400 });

	return (
		<Box sx={{ background: "#00000020", width: "100%" }}>
			<Collapse in={!trigger}>
				<Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center", py: "0.25rem" }}>
					<Button variant='text' size='small' startIcon={<Email />} sx={{ color: "white" }} href='mailto:grkaliningrada@gmail.com'>
						grkaliningrada@gmail.com
					</Button>
					<Button variant='text' size='small' startIcon={<Phone />} sx={{ color: "white" }} href='tel:+79637382139'>
						+7 (963) 738-21-39
					</Button>
					<IconButton size='small' sx={{ color: "white", ml: "0.5rem" }} href='https://t.me/+eb5NWF3qGdZkMzcy' target='_blank'>
						<Telegram fontSize='small' />
					</IconButton>
					<IconButton size='small' sx={{ color: "white" }} href='https://vk.com/grkaliningrad' target='_blank'>
						<VK fontSize='small' />
					</IconButton>
				</Box>
			</Collapse>
		</Box>
	);
}

export default TopNavigation;
