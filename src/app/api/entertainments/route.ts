import { query } from "@/actions/database";
import { Entertainment } from "@/app/types/interfaces";
import { FALLBACK_ENTERTAINMENTS } from "@/lib/contentFallback";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

const rowToEntertainment = (row: EntertainmentRow): Entertainment => ({
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

const requireAdmin = async () => {
	const cookieStore = await cookies();
	return Boolean(cookieStore.get("kfntoken"));
};

export async function GET(request: NextRequest) {
	try {
		const includeInactive = request.nextUrl.searchParams.get("all") === "true";
		const rows = includeInactive
			? ((await query("SELECT * FROM entertainments ORDER BY sort_order ASC, id ASC", [])) as EntertainmentRow[])
			: ((await query("SELECT * FROM entertainments WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as EntertainmentRow[]);
		return NextResponse.json(rows.map(rowToEntertainment));
	} catch (error) {
		console.error("GET /api/entertainments failed:", error);
		const includeInactive = request.nextUrl.searchParams.get("all") === "true";
		return NextResponse.json(includeInactive ? [] : FALLBACK_ENTERTAINMENTS);
	}
}

export async function POST(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as Entertainment;
	const validation = validateEntertainment(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const now = Date.now();
	const inserted = (await query(
		`INSERT INTO entertainments (
			slug, title, description, price, image, special, sort_order, is_active, created_at, updated_at
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
		[
			data.id.trim(),
			data.title.trim(),
			data.description.trim(),
			Number(data.price),
			data.image.trim(),
			Boolean(data.special),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			now,
			now
		]
	)) as EntertainmentRow[];

	return NextResponse.json(rowToEntertainment(inserted[0]));
}

export async function PUT(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as Entertainment;
	if (!data.rowId) return NextResponse.json({ message: "rowId required" }, { status: 400 });
	const validation = validateEntertainment(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const updated = (await query(
		`UPDATE entertainments SET
			slug = $1, title = $2, description = $3, price = $4, image = $5, special = $6,
			sort_order = $7, is_active = $8, updated_at = $9
		WHERE id = $10 RETURNING *`,
		[
			data.id.trim(),
			data.title.trim(),
			data.description.trim(),
			Number(data.price),
			data.image.trim(),
			Boolean(data.special),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			Date.now(),
			data.rowId
		]
	)) as EntertainmentRow[];

	if (updated.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json(rowToEntertainment(updated[0]));
}

export async function DELETE(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const id = Number(request.nextUrl.searchParams.get("id"));
	if (!id) return NextResponse.json({ message: "id required" }, { status: 400 });
	await query("DELETE FROM entertainments WHERE id = $1", [id]);
	return NextResponse.json({ message: "Deleted" });
}

function validateEntertainment(e: Entertainment): string | null {
	if (!e.id?.trim()) return "Slug обязателен";
	if (!/^[a-z0-9-]+$/.test(e.id.trim())) return "Slug: только латиница, цифры и дефис";
	if (!e.title?.trim()) return "Название обязательно";
	if (!e.description?.trim()) return "Описание обязательно";
	if (!Number.isFinite(Number(e.price)) || Number(e.price) < 0) return "Цена должна быть числом ≥ 0";
	if (!e.image?.trim()) return "Изображение обязательно";
	return null;
}
