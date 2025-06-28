import { SxProps } from "@mui/material";

export interface Entertainment {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
	special?: boolean;
}

export interface Program {
	id: string;
	title: string;
	description: string;
}

export interface AdditionalEntertainmentsPageProps {
	params: Promise<{
		articleid: string;
	}>;
}

export interface ProgrammPageProps {
	params: Promise<{
		programid: string;
	}>;
}

export interface TimelineProps {
	timeline: Timeline;
}

export interface ButtonProps {
	variant?: "text" | "outlined" | "contained";
	color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
	sx?: SxProps;
	fullWidth?: boolean;
}

export interface TimelineItem {
	name: string;
	time: string;
	description: string;
	speaker?: { name: string; description: string };
	speakers?: string;
}
export interface Timeline {
	id: string;
	title: string;
	description: string;
	date: string;
	content: TimelineItem[];
}

export interface ModalRegistrationProps {
	buttonProps?: ButtonProps;
	hideOnScroll?: boolean;
}
