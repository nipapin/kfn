"use client";

import { Button, Collapse, Typography, useScrollTrigger } from "@mui/material";
import ModalRegistration from "./ModalRegistration";

function RegistrationButton() {
	const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 400 });
	return (
		<Collapse in={trigger} orientation='horizontal' unmountOnExit>
			<ModalRegistration />
			{/* <Button variant='contained' color='secondary' sx={{ color: "primary.main" }}>
				<Typography fontWeight='600'>Регистрация</Typography>
			</Button> */}
		</Collapse>
	);
}

export default RegistrationButton;
