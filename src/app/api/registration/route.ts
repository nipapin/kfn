import { query } from "@/actions/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const data = await request.json();
	const { tariff, fullName, companyName, city, email, phone, promoCode } = data;
	await query(
		"INSERT INTO registration (price, name, company, city, email, phone, promocode, status, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
		[tariff, fullName, companyName, city, email, phone, promoCode, "pending", Date.now()]
	).catch((error) => {
		console.error(error);
		return NextResponse.json({ message: "Registration failed" }, { status: 500 });
	});
	return NextResponse.json({ message: "Registration successful" });
}

export async function GET() {
	const data = await query("SELECT * FROM registration ORDER BY timestamp DESC", []);
	return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
	const data = await request.json();
	const { id, status } = data;
	const updatedData = await query("UPDATE registration SET status = $1 WHERE id = $2 RETURNING *", [status, id]);
	return NextResponse.json(updatedData);
}
