"use client";

import { ExpandLess } from "@mui/icons-material";
import { Fab } from "@mui/material";

function UpNavigation() {
	return (
		<Fab
			color='primary'
			aria-label='add'
			sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			<ExpandLess />
		</Fab>
	);
}

export default UpNavigation;
