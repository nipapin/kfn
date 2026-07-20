"use server";

import { query } from "./actions/database";
import { PackageBenefit, Partner, ParticipationPackage } from "./app/types/interfaces";
import { entertainments } from "./db/database";
import { FALLBACK_PACKAGES } from "./lib/packagesFallback";

export const getArticle = async (articleid: string) => {
	return entertainments.find((article) => article.id === articleid);
};

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

const parseBenefits = (raw: PackageBenefit[] | string): PackageBenefit[] => {
	if (Array.isArray(raw)) return raw;
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

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
