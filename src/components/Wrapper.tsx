"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
	const [appBarHeight, setAppBarHeight] = useState<number>(0);

	useEffect(() => {
		setAppBarHeight(document.getElementById("app-bar")?.clientHeight || 0);
	}, []);

	return <Box sx={{ width: "100%", mt: `${appBarHeight}px` }}>{children}</Box>;
}
