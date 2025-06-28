"use client";

import { ModalRegistrationProps } from "@/app/types/interfaces";
import { Button, Collapse, Dialog, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";

function ModalRegistration({ buttonProps, hideOnScroll = true }: ModalRegistrationProps) {
	const [open, setOpen] = useState(false);
	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 400 });
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down("md"));
	const collapsed = (
		<>
			<Button
				fullWidth={buttonProps?.fullWidth}
				variant={buttonProps?.variant || "contained"}
				color={buttonProps?.color || "primary"}
				sx={buttonProps?.sx || { width: "100%", mt: 4, borderRadius: 2, maxWidth: "300px", py: 2 }}
				onClick={() => setOpen(true)}
			>
				Регистрация
			</Button>
			<Dialog open={open} fullScreen={isMobile} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { backgroundColor: "transparent" } } }}>
				<RegistrationForm modal={true} close={() => setOpen(false)} />
			</Dialog>
		</>
	);
	return hideOnScroll ? (
		<Collapse in={trigger} orientation='horizontal' unmountOnExit>
			{collapsed}
		</Collapse>
	) : (
		collapsed
	);
}

export default ModalRegistration;
