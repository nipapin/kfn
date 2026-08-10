import { query } from "@/actions/database";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const cookieStore = await cookies();
	if (!cookieStore.get("kfntoken")) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { ids } = (await request.json()) as { ids: number[] };
	if (!Array.isArray(ids) || ids.length === 0) {
		return NextResponse.json({ message: "Передайте массив ids" }, { status: 400 });
	}
	const numericIds = ids.map(Number);
	if (numericIds.some((n) => !Number.isFinite(n) || n <= 0)) {
		return NextResponse.json({ message: "Некорректные id" }, { status: 400 });
	}

	const now = Date.now();
	const values = numericIds.map((_, idx) => `($${idx * 2 + 1}::int, $${idx * 2 + 2}::int)`).join(", ");
	const params: number[] = [];
	numericIds.forEach((id, idx) => {
		params.push(id, idx * 10);
	});

	await query(
		`UPDATE tours AS t
		SET sort_order = v.sort_order, updated_at = ${now}
		FROM (VALUES ${values}) AS v(id, sort_order)
		WHERE t.id = v.id`,
		params
	);

	return NextResponse.json({ message: "Reordered", count: numericIds.length });
}
