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

export interface Hall {
	name: string;
	content: TimelineItem[];
}

export interface Timeline {
	id: string;
	title: string;
	description: string;
	date: string;
	halls: Hall[];
	content: TimelineItem[];
}

export interface ModalRegistrationProps {
	buttonProps?: ButtonProps;
	hideOnScroll?: boolean;
}

export interface TourItem {
	id: string;
	name: string;
	type: string;
	description: string;
	content: TourContentItem[];
	price: number;
	image: string;
}

export interface TourContentItem {
	id: number;
	time: string;
	title: string;
	description: string;
}

export interface Partner {
	image: {
		src: string;
		width: number;
		height: number;
		alt: string;
	};
	name: string;
	description: string;
	type?: string;
	body?: string[];
	video?: {
		src: string;
		width: number;
		height: number;
		poster: string;
	};
}
