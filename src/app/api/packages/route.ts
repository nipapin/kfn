import { query } from "@/actions/database";
import { PackageBenefit, ParticipationPackage } from "@/app/types/interfaces";
import { FALLBACK_PACKAGES } from "@/lib/packagesFallback";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface PackageRow {
	id: number;
	title: string;
	price: number;
	vip: boolean;
	benefits: PackageBenefit[] | string;
	sort_order: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
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

const rowToPackage = (row: PackageRow): ParticipationPackage => ({
	id: row.id,
	title: row.title,
	price: Number(row.price),
	vip: Boolean(row.vip),
	benefits: parseBenefits(row.benefits),
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
			? ((await query("SELECT * FROM packages ORDER BY sort_order ASC, id ASC", [])) as PackageRow[])
			: ((await query("SELECT * FROM packages WHERE is_active = TRUE ORDER BY sort_order ASC, id ASC", [])) as PackageRow[]);
		return NextResponse.json(rows.map(rowToPackage));
	} catch (error) {
		console.error("GET /api/packages failed:", error);
		const includeInactive = request.nextUrl.searchParams.get("all") === "true";
		return NextResponse.json(includeInactive ? [] : FALLBACK_PACKAGES);
	}
}

export async function POST(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as ParticipationPackage;

	const validation = validatePackage(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const now = Date.now();
	const inserted = (await query(
		`INSERT INTO packages (
			title, price, vip, benefits, sort_order, is_active, created_at, updated_at
		) VALUES ($1,$2,$3,$4::jsonb,$5,$6,$7,$8) RETURNING *`,
		[
			data.title.trim(),
			Number(data.price),
			Boolean(data.vip),
			JSON.stringify(data.benefits ?? []),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			now,
			now
		]
	)) as PackageRow[];

	return NextResponse.json(rowToPackage(inserted[0]));
}

export async function PUT(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const data = (await request.json()) as ParticipationPackage;
	if (!data.id) return NextResponse.json({ message: "id required" }, { status: 400 });

	const validation = validatePackage(data);
	if (validation) return NextResponse.json({ message: validation }, { status: 400 });

	const updated = (await query(
		`UPDATE packages SET
			title = $1, price = $2, vip = $3, benefits = $4::jsonb,
			sort_order = $5, is_active = $6, updated_at = $7
		WHERE id = $8 RETURNING *`,
		[
			data.title.trim(),
			Number(data.price),
			Boolean(data.vip),
			JSON.stringify(data.benefits ?? []),
			Number(data.sortOrder ?? 0),
			data.isActive ?? true,
			Date.now(),
			data.id
		]
	)) as PackageRow[];

	if (updated.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
	return NextResponse.json(rowToPackage(updated[0]));
}

export async function DELETE(request: NextRequest) {
	if (!(await requireAdmin())) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const id = Number(request.nextUrl.searchParams.get("id"));
	if (!id) return NextResponse.json({ message: "id required" }, { status: 400 });
	await query("DELETE FROM packages WHERE id = $1", [id]);
	return NextResponse.json({ message: "Deleted" });
}

function validatePackage(p: ParticipationPackage): string | null {
	if (!p.title?.trim()) return "Название обязательно";
	if (!Number.isFinite(Number(p.price)) || Number(p.price) < 0) return "Цена должна быть числом ≥ 0";
	if (!Array.isArray(p.benefits)) return "Список преимуществ обязателен";
	for (const b of p.benefits) {
		if (!b?.label?.trim()) return "У каждого преимущества должен быть текст";
	}
	return null;
}
