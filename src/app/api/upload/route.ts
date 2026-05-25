import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml", "video/mp4", "video/webm"]);
const ALLOWED_FOLDERS = new Set(["partners", "video"]);
const MAX_SIZE = 25 * 1024 * 1024; // 25 MB

function slugify(name: string) {
	const ext = path.extname(name).toLowerCase();
	const base = path
		.basename(name, ext)
		.toLowerCase()
		.replace(/[^a-z0-9-_]+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "")
		.slice(0, 60);
	const safeBase = base || "file";
	return `${safeBase}-${Date.now()}${ext}`;
}

export async function POST(request: NextRequest) {
	const cookieStore = await cookies();
	if (!cookieStore.get("kfntoken")) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const formData = await request.formData();
	const file = formData.get("file");
	const folderRaw = String(formData.get("folder") ?? "partners");

	if (!(file instanceof File)) {
		return NextResponse.json({ message: "Файл не передан" }, { status: 400 });
	}
	if (!ALLOWED_MIME.has(file.type)) {
		return NextResponse.json({ message: `Недопустимый формат: ${file.type}` }, { status: 400 });
	}
	if (file.size > MAX_SIZE) {
		return NextResponse.json({ message: "Файл больше 25MB" }, { status: 400 });
	}
	const folder = ALLOWED_FOLDERS.has(folderRaw) ? folderRaw : "partners";

	const buffer = Buffer.from(await file.arrayBuffer());
	const targetDir = path.join(process.cwd(), "public", "images", folder);
	await mkdir(targetDir, { recursive: true });
	const filename = slugify(file.name);
	const filepath = path.join(targetDir, filename);
	await writeFile(filepath, buffer);

	return NextResponse.json({
		src: `/images/${folder}/${filename}`,
		filename,
		size: file.size,
		type: file.type
	});
}
