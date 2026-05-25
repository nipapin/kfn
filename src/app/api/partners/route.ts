import { query } from "@/actions/database";
import { Partner } from "@/app/types/interfaces";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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
	created_at: string;
	updated_at: string;
}

const rowToPartner = (row: PartnerRow): Partner => ({
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
});

const requireAdmin = async () => {
	const cookieStore = await cookies();
	return Boolean(cookieStore.get("kfntoken"));
};

export async function GET(request: NextRequest) {
	const includeInactive = request.nextUrl.searchParams.get("all") === "true";
	const rows = includeInactive
		? ((await query("SELECT * FROM partners ORDER BY sort_order ASC, id ASC", [])) as PartnerRow[])
		: ((await query("SELECT * FROM partners WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as PartnerRow[]);
	return NextResponse.json(rows.map(rowToPartner));
}

export async function POST(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as Partner;

	const validation = validatePartner(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const now = Date.now();
	const bodyText = Array.isArray(data.body) && data.body.length > 0 ? data.body.join("\n---\n") : null;

	const inserted = (await query(
		`INSERT INTO partners (
			name, type, description, body,
			image_src, image_width, image_height, image_alt,
			video_src, video_width, video_height, video_poster,
			sort_order, is_active, created_at, updated_at
		) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
		[
			data.name.trim(),
			data.type?.trim() || null,
			data.description.trim(),
			bodyText,
			data.image.src,
			data.image.width,
			data.image.height,
			data.image.alt,
			data.video?.src ?? null,
			data.video?.width ?? null,
			data.video?.height ?? null,
			data.video?.poster ?? null,
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			now,
			now
		]
	)) as PartnerRow[];

	return NextResponse.json(rowToPartner(inserted[0]));
}

export async function PUT(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as Partner;
	if (!data.id) return NextResponse.json({ message: "id required" }, { status: 400 });

	const validation = validatePartner(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const bodyText = Array.isArray(data.body) && data.body.length > 0 ? data.body.join("\n---\n") : null;

	const updated = (await query(
		`UPDATE partners SET
			name = $1, type = $2, description = $3, body = $4,
			image_src = $5, image_width = $6, image_height = $7, image_alt = $8,
			video_src = $9, video_width = $10, video_height = $11, video_poster = $12,
			sort_order = $13, is_active = $14, updated_at = $15
		WHERE id = $16 RETURNING *`,
		[
			data.name.trim(),
			data.type?.trim() || null,
			data.description.trim(),
			bodyText,
			data.image.src,
			data.image.width,
			data.image.height,
			data.image.alt,
			data.video?.src ?? null,
			data.video?.width ?? null,
			data.video?.height ?? null,
			data.video?.poster ?? null,
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			Date.now(),
			data.id
		]
	)) as PartnerRow[];

	if (updated.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json(rowToPartner(updated[0]));
}

export async function DELETE(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const id = Number(request.nextUrl.searchParams.get("id"));
	if (!id) return NextResponse.json({ message: "id required" }, { status: 400 });
	await query("DELETE FROM partners WHERE id = $1", [id]);
	return NextResponse.json({ message: "Deleted" });
}

function validatePartner(p: Partner): string | null {
	if (!p.name?.trim()) return "Имя обязательно";
	if (!p.description?.trim()) return "Описание обязательно";
	if (!p.image?.src) return "Изображение обязательно";
	if (!p.image?.width || !p.image?.height) return "Размер изображения обязателен";
	if (!p.image?.alt?.trim()) return "Alt изображения обязателен";
	return null;
}
