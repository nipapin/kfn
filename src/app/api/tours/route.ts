import { query } from "@/actions/database";
import { TourContentItem, TourItem } from "@/app/types/interfaces";
import { FALLBACK_TOURS } from "@/lib/contentFallback";
import { parseJsonArray } from "@/lib/jsonField";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

const rowToTour = (row: TourRow): TourItem => ({
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

const requireAdmin = async () => {
	const cookieStore = await cookies();
	return Boolean(cookieStore.get("kfntoken"));
};

export async function GET(request: NextRequest) {
	try {
		const includeInactive = request.nextUrl.searchParams.get("all") === "true";
		const slug = request.nextUrl.searchParams.get("slug");
		if (slug) {
			const rows = (await query(
				includeInactive
					? "SELECT * FROM tours WHERE slug = $1"
					: "SELECT * FROM tours WHERE slug = $1 AND is_active = TRUE",
				[slug]
			)) as TourRow[];
			return NextResponse.json(rows.map(rowToTour));
		}
		const rows = includeInactive
			? ((await query("SELECT * FROM tours ORDER BY sort_order ASC, id ASC", [])) as TourRow[])
			: ((await query("SELECT * FROM tours WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as TourRow[]);
		return NextResponse.json(rows.map(rowToTour));
	} catch (error) {
		console.error("GET /api/tours failed:", error);
		const includeInactive = request.nextUrl.searchParams.get("all") === "true";
		const slug = request.nextUrl.searchParams.get("slug");
		if (includeInactive) return NextResponse.json([]);
		const fallback = slug ? FALLBACK_TOURS.filter((t) => t.id === slug) : FALLBACK_TOURS;
		return NextResponse.json(fallback);
	}
}

export async function POST(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as TourItem;
	const validation = validateTour(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const now = Date.now();
	const inserted = (await query(
		`INSERT INTO tours (
			slug, name, type, description, price, image, content, sort_order, is_active, created_at, updated_at
		) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10,$11) RETURNING *`,
		[
			data.id.trim(),
			data.name.trim(),
			data.type?.trim() ?? "",
			data.description?.trim() ?? "",
			Number(data.price),
			data.image?.trim() ?? "",
			JSON.stringify(data.content ?? []),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			now,
			now
		]
	)) as TourRow[];

	return NextResponse.json(rowToTour(inserted[0]));
}

export async function PUT(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as TourItem;
	if (!data.rowId) return NextResponse.json({ message: "rowId required" }, { status: 400 });
	const validation = validateTour(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const updated = (await query(
		`UPDATE tours SET
			slug = $1, name = $2, type = $3, description = $4, price = $5, image = $6,
			content = $7::jsonb, sort_order = $8, is_active = $9, updated_at = $10
		WHERE id = $11 RETURNING *`,
		[
			data.id.trim(),
			data.name.trim(),
			data.type?.trim() ?? "",
			data.description?.trim() ?? "",
			Number(data.price),
			data.image?.trim() ?? "",
			JSON.stringify(data.content ?? []),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			Date.now(),
			data.rowId
		]
	)) as TourRow[];

	if (updated.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json(rowToTour(updated[0]));
}

export async function DELETE(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const id = Number(request.nextUrl.searchParams.get("id"));
	if (!id) return NextResponse.json({ message: "id required" }, { status: 400 });
	await query("DELETE FROM tours WHERE id = $1", [id]);
	return NextResponse.json({ message: "Deleted" });
}

function validateTour(t: TourItem): string | null {
	if (!t.id?.trim()) return "Slug обязателен";
	if (!/^[a-z0-9-]+$/.test(t.id.trim())) return "Slug: только латиница, цифры и дефис";
	if (!t.name?.trim()) return "Название обязательно";
	if (!Number.isFinite(Number(t.price)) || Number(t.price) < 0) return "Цена должна быть числом ≥ 0";
	if (!Array.isArray(t.content)) return "Маршрут должен быть массивом";
	return null;
}
