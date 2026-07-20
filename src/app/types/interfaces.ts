import { SxProps } from "@mui/material";

export interface Entertainment {
	/** Numeric DB primary key (admin mutations) */
	rowId?: number;
	/** Public slug used in URLs */
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
	special?: boolean;
	sortOrder?: number;
	isActive?: boolean;
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
	/** Numeric DB primary key (admin mutations) */
	rowId?: number;
	/** Program group slug, e.g. "business" */
	id: string;
	title: string;
	description: string;
	date: string;
	halls: Hall[];
	content: TimelineItem[];
	sortOrder?: number;
	isActive?: boolean;
}

export interface ModalRegistrationProps {
	buttonProps?: ButtonProps;
	hideOnScroll?: boolean;
}

export interface TourItem {
	/** Numeric DB primary key (admin mutations) */
	rowId?: number;
	/** Public slug used in URLs */
	id: string;
	name: string;
	type: string;
	description: string;
	content: TourContentItem[];
	price: number;
	image: string;
	sortOrder?: number;
	isActive?: boolean;
}

export interface TourContentItem {
	id: number;
	time: string;
	title: string;
	description: string;
}

export interface Partner {
	id?: number;
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
	sortOrder?: number;
	isActive?: boolean;
}

export interface PackageBenefit {
	available: boolean;
	label: string;
}

export interface ParticipationPackage {
	id?: number;
	title: string;
	price: number;
	vip: boolean;
	benefits: PackageBenefit[];
	sortOrder?: number;
	isActive?: boolean;
}
