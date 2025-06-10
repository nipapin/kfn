"use client";

import { Button, Collapse, Dialog, SxProps, useScrollTrigger } from "@mui/material";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm";

interface ButtonProps {
	variant?: "text" | "outlined" | "contained";
	color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
	sx?: SxProps;
}

function ModalRegistration({ buttonProps, hideOnScroll = true }: { buttonProps?: ButtonProps; hideOnScroll?: boolean }) {
	const [open, setOpen] = useState(false);
	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 400 });
	const collapsed = (
		<>
			<Button
				variant={buttonProps?.variant || "contained"}
				color={buttonProps?.color || "primary"}
				sx={buttonProps?.sx || { width: "100%", mt: 4, borderRadius: 2, maxWidth: "300px", py: 2 }}
				onClick={() => setOpen(true)}
			>
				Регистрация
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { backgroundColor: "transparent" } } }}>
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
