"use client";

import { Box, List, ListItemText, MenuItem, Popover, Typography } from "@mui/material";
import NextLink from "next/link";
import { MouseEvent, useState } from "react";

interface CompoundMenuItemRoute {
	title: string;
	href: string;
}

interface CompoundMenuItemProps {
	title: string;
	items: CompoundMenuItemRoute[];
}

export default function CompoundMenuItem({ title, items }: CompoundMenuItemProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const toggle = (state: boolean) => (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(state ? event.currentTarget : null);
	};

	return (
		<Box>
			<Typography onMouseEnter={toggle(true)} sx={{ cursor: "pointer" }}>
				{title}
			</Typography>
			<Popover
				open={open}
				onClose={() => setAnchorEl(null)}
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				slotProps={{ paper: { elevation: 4, sx: { backgroundColor: "primary.main" }, onMouseLeave: toggle(false) } }}
			>
				<List>
					{items.map((item) => (
						<NextLink key={item.href} href={item.href} passHref>
							<MenuItem sx={{ color: "white" }}>
								<ListItemText primary={item.title} />
							</MenuItem>
						</NextLink>
					))}
				</List>
			</Popover>
		</Box>
	);
}
