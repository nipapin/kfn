import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const payload = await request.json();
	const { login, password } = payload;
	console.log(login, password);
	const sucsses = login === process.env.ADMIN_LOGIN && password === process.env.ADMIN_PASSWORD;
	if (sucsses) {
		const response = NextResponse.json({ message: "Authorisation successful" });
		response.cookies.set("kfntoken", "authenticated", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});
		return response;
	}
	return NextResponse.json({ message: "Authorisation failed" }, { status: 401 });
}
