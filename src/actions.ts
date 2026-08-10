"use server";

import { query } from "./actions/database";
import {
	Entertainment,
	Hall,
	PackageBenefit,
	Partner,
	ParticipationPackage,
	Timeline,
	TimelineItem,
	TourContentItem,
	TourItem
} from "./app/types/interfaces";
import { FALLBACK_ENTERTAINMENTS, FALLBACK_PROGRAM, FALLBACK_TOURS } from "./lib/contentFallback";
import { parseJsonArray } from "./lib/jsonField";
import { FALLBACK_PACKAGES } from "./lib/packagesFallback";

interface PartnerRow {
	id: number;
	name: string;
	type: string | null;
	description: string;
	body: string | null;
	image_src: string;
	image_width: number;
	image_height: number;
	image_alt: string;
	video_src: string | null;
	video_width: number | null;
	video_height: number | null;
	video_poster: string | null;
	sort_order: number;
	is_active: boolean;
}

interface PackageRow {
	id: number;
	title: string;
	price: number;
	vip: boolean;
	benefits: PackageBenefit[] | string;
	sort_order: number;
	is_active: boolean;
}

interface EntertainmentRow {
	id: number;
	slug: string;
	title: string;
	description: string;
	price: number;
	image: string;
	special: boolean;
	sort_order: number;
	is_active: boolean;
}

interface ProgramDayRow {
	id: number;
	slug: string;
	title: string;
	description: string;
	date: string;
	halls: Hall[] | string;
	content: TimelineItem[] | string;
	sort_order: number;
	is_active: boolean;
}

interface TourRow {
	id: number;
	slug: string;
	name: string;
	type: string;
	description: string;
	price: number;
	image: string;
	content: TourContentItem[] | string;
	sort_order: number;
	is_active: boolean;
}

const parseBenefits = (raw: PackageBenefit[] | string): PackageBenefit[] => {
	if (Array.isArray(raw)) return raw;
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

const mapEntertainment = (row: EntertainmentRow): Entertainment => ({
	rowId: row.id,
	id: row.slug,
	title: row.title,
	description: row.description,
	price: Number(row.price),
	image: row.image,
	special: Boolean(row.special),
	sortOrder: row.sort_order,
	isActive: row.is_active
});

const mapProgramDay = (row: ProgramDayRow): Timeline => ({
	rowId: row.id,
	id: row.slug,
	title: row.title,
	description: row.description,
	date: row.date,
	halls: parseJsonArray<Hall>(row.halls),
	content: parseJsonArray<TimelineItem>(row.content),
	sortOrder: row.sort_order,
	isActive: row.is_active
});

const mapTour = (row: TourRow): TourItem => ({
	rowId: row.id,
	id: row.slug,
	name: row.name,
	type: row.type,
	description: row.description,
	price: Number(row.price),
	image: row.image,
	content: parseJsonArray<TourContentItem>(row.content),
	sortOrder: row.sort_order,
	isActive: row.is_active
});

export const getPartners = async (): Promise<Partner[]> => {
	try {
		const rows = (await query("SELECT * FROM partners WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as PartnerRow[];
		return rows.map((row) => ({
			id: row.id,
			name: row.name,
			type: row.type ?? undefined,
			description: row.description,
			body: row.body ? row.body.split("\n---\n").filter(Boolean) : undefined,
			image: {
				src: row.image_src,
				width: row.image_width,
				height: row.image_height,
				alt: row.image_alt
			},
			video:
				row.video_src && row.video_width && row.video_height && row.video_poster
					? {
							src: row.video_src,
							width: row.video_width,
							height: row.video_height,
							poster: row.video_poster
					  }
					: undefined,
			sortOrder: row.sort_order,
			isActive: row.is_active
		}));
	} catch (error) {
		console.error("getPartners failed:", error);
		return [];
	}
};

export const getPackages = async (): Promise<ParticipationPackage[]> => {
	try {
		const rows = (await query("SELECT * FROM packages WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as PackageRow[];
		return rows.map((row) => ({
			id: row.id,
			title: row.title,
			price: Number(row.price),
			vip: Boolean(row.vip),
			benefits: parseBenefits(row.benefits),
			sortOrder: row.sort_order,
			isActive: row.is_active
		}));
	} catch (error) {
		console.error("getPackages failed:", error);
		return FALLBACK_PACKAGES;
	}
};

export const getEntertainments = async (): Promise<Entertainment[]> => {
	try {
		const rows = (await query(
			"SELECT * FROM entertainments WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC",
			[]
		)) as EntertainmentRow[];
		return rows.map(mapEntertainment);
	} catch (error) {
		console.error("getEntertainments failed:", error);
		return FALLBACK_ENTERTAINMENTS;
	}
};

export const getArticle = async (articleid: string): Promise<Entertainment | undefined> => {
	try {
		const rows = (await query(
			"SELECT * FROM entertainments WHERE slug = $1 AND is_active = TRUE LIMIT 1",
			[articleid]
		)) as EntertainmentRow[];
		if (rows[0]) return mapEntertainment(rows[0]);
		return FALLBACK_ENTERTAINMENTS.find((a) => a.id === articleid);
	} catch (error) {
		console.error("getArticle failed:", error);
		return FALLBACK_ENTERTAINMENTS.find((a) => a.id === articleid);
	}
};

export const getProgramDays = async (slug?: string): Promise<Timeline[]> => {
	try {
		const rows = slug
			? ((await query(
					"SELECT * FROM program_days WHERE slug = $1 AND is_active = TRUE ORDER BY sort_order ASC, id ASC",
					[slug]
			  )) as ProgramDayRow[])
			: ((await query(
					"SELECT * FROM program_days WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC",
					[]
			  )) as ProgramDayRow[]);
		return rows.map(mapProgramDay);
	} catch (error) {
		console.error("getProgramDays failed:", error);
		return slug ? FALLBACK_PROGRAM.filter((p) => p.id === slug) : FALLBACK_PROGRAM;
	}
};

export const getTours = async (): Promise<TourItem[]> => {
	try {
		const rows = (await query("SELECT * FROM tours WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as TourRow[];
		return rows.map(mapTour);
	} catch (error) {
		console.error("getTours failed:", error);
		return FALLBACK_TOURS;
	}
};

export const getTour = async (slug: string): Promise<TourItem | undefined> => {
	try {
		const rows = (await query("SELECT * FROM tours WHERE slug = $1 AND is_active = TRUE LIMIT 1", [slug])) as TourRow[];
		if (rows[0]) return mapTour(rows[0]);
		return FALLBACK_TOURS.find((t) => t.id === slug);
	} catch (error) {
		console.error("getTour failed:", error);
		return FALLBACK_TOURS.find((t) => t.id === slug);
	}
};
