import { query } from "@/actions/database";
import { NextRequest, NextResponse } from "next/server";

const tariffs: Record<number, string> = {
	1: "Базовый",
	2: "Премьер",
	3: "VIP"
};

export async function POST(request: NextRequest) {
	const data = await request.json();
	const { tariff, fullName, companyName, city, email, phone, promoCode } = data;
	const tariffName = tariffs[tariff as keyof typeof tariffs];
	await query("INSERT INTO registration (price, name, company, city, email, phone, promocode, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
		tariffName,
		fullName,
		companyName,
		city,
		email,
		phone,
		promoCode,
		"pending"
	]).catch((error) => {
		console.error(error);
		return NextResponse.json({ message: "Registration failed" }, { status: 500 });
	});
	return NextResponse.json({ message: "Registration successful" });
}

export async function GET() {
	const data = await query("SELECT * FROM registration", []);
	return NextResponse.json(data);
}
