import { query } from "@/actions/database";
import { Hall, Timeline, TimelineItem } from "@/app/types/interfaces";
import { FALLBACK_PROGRAM } from "@/lib/contentFallback";
import { parseJsonArray } from "@/lib/jsonField";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

const rowToTimeline = (row: ProgramDayRow): Timeline => ({
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

const requireAdmin = async () => {
	const cookieStore = await cookies();
	return Boolean(cookieStore.get("kfntoken"));
};

export async function GET(request: NextRequest) {
	try {
		const includeInactive = request.nextUrl.searchParams.get("all") === "true";
		const slug = request.nextUrl.searchParams.get("slug");
		let rows: ProgramDayRow[];
		if (slug) {
			rows = includeInactive
				? ((await query("SELECT * FROM program_days WHERE slug = $1 ORDER BY sort_order ASC, id ASC", [slug])) as ProgramDayRow[])
				: ((await query(
						"SELECT * FROM program_days WHERE slug = $1 AND is_active = TRUE ORDER BY sort_order ASC, id ASC",
						[slug]
				  )) as ProgramDayRow[]);
		} else {
			rows = includeInactive
				? ((await query("SELECT * FROM program_days ORDER BY sort_order ASC, id ASC", [])) as ProgramDayRow[])
				: ((await query("SELECT * FROM program_days WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as ProgramDayRow[]);
		}
		return NextResponse.json(rows.map(rowToTimeline));
	} catch (error) {
		console.error("GET /api/program-days failed:", error);
		const includeInactive = request.nextUrl.searchParams.get("all") === "true";
		const slug = request.nextUrl.searchParams.get("slug");
		if (includeInactive) return NextResponse.json([]);
		const fallback = slug ? FALLBACK_PROGRAM.filter((p) => p.id === slug) : FALLBACK_PROGRAM;
		return NextResponse.json(fallback);
	}
}

export async function POST(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as Timeline;
	const validation = validateTimeline(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const now = Date.now();
	const inserted = (await query(
		`INSERT INTO program_days (
			slug, title, description, date, halls, content, sort_order, is_active, created_at, updated_at
		) VALUES ($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9,$10) RETURNING *`,
		[
			data.id.trim(),
			data.title.trim(),
			data.description?.trim() ?? "",
			data.date?.trim() ?? "",
			JSON.stringify(data.halls ?? []),
			JSON.stringify(data.content ?? []),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			now,
			now
		]
	)) as ProgramDayRow[];

	return NextResponse.json(rowToTimeline(inserted[0]));
}

export async function PUT(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as Timeline;
	if (!data.rowId) return NextResponse.json({ message: "rowId required" }, { status: 400 });
	const validation = validateTimeline(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const updated = (await query(
		`UPDATE program_days SET
			slug = $1, title = $2, description = $3, date = $4,
			halls = $5::jsonb, content = $6::jsonb,
			sort_order = $7, is_active = $8, updated_at = $9
		WHERE id = $10 RETURNING *`,
		[
			data.id.trim(),
			data.title.trim(),
			data.description?.trim() ?? "",
			data.date?.trim() ?? "",
			JSON.stringify(data.halls ?? []),
			JSON.stringify(data.content ?? []),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			Date.now(),
			data.rowId
		]
	)) as ProgramDayRow[];

	if (updated.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json(rowToTimeline(updated[0]));
}

export async function DELETE(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const id = Number(request.nextUrl.searchParams.get("id"));
	if (!id) return NextResponse.json({ message: "id required" }, { status: 400 });
	await query("DELETE FROM program_days WHERE id = $1", [id]);
	return NextResponse.json({ message: "Deleted" });
}

function validateTimeline(t: Timeline): string | null {
	if (!t.id?.trim()) return "Slug обязателен";
	if (!/^[a-z0-9-]+$/.test(t.id.trim())) return "Slug: только латиница, цифры и дефис";
	if (!t.title?.trim()) return "Название обязательно";
	if (!Array.isArray(t.halls)) return "Залы должны быть массивом";
	if (!Array.isArray(t.content)) return "Программа должна быть массивом";
	return null;
}
