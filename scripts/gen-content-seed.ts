import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { FALLBACK_ENTERTAINMENTS as entertainments, FALLBACK_PROGRAM as program, FALLBACK_TOURS as tours } from "../src/lib/contentFallback";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function dollarJson(value: unknown) {
	return `$seedjson$${JSON.stringify(value)}$seedjson$`;
}

function esc(str: string) {
	return String(str).replace(/'/g, "''");
}

const lines: string[] = [
	"-- Auto-generated seed from src/db/database.ts — do not edit by hand",
	"-- Regenerate: npx tsx scripts/gen-content-seed.ts",
	""
];

lines.push("INSERT INTO entertainments (slug, title, description, price, image, special, sort_order, is_active, created_at, updated_at)");
lines.push("SELECT v.slug, v.title, v.description, v.price, v.image, v.special, v.sort_order, TRUE,");
lines.push("  (EXTRACT(EPOCH FROM NOW())::bigint * 1000), (EXTRACT(EPOCH FROM NOW())::bigint * 1000)");
lines.push("FROM (VALUES");
entertainments.forEach((e, i) => {
	const comma = i < entertainments.length - 1 ? "," : "";
	lines.push(
		`  ('${esc(e.id)}', '${esc(e.title)}', '${esc(e.description)}', ${Number(e.price)}, '${esc(e.image)}', ${e.special ? "TRUE" : "FALSE"}, ${i * 10})${comma}`
	);
});
lines.push(") AS v(slug, title, description, price, image, special, sort_order)");
lines.push("WHERE NOT EXISTS (SELECT 1 FROM entertainments LIMIT 1);");
lines.push("");

lines.push("INSERT INTO program_days (slug, title, description, date, halls, content, sort_order, is_active, created_at, updated_at)");
lines.push("SELECT v.slug, v.title, v.description, v.date, v.halls::jsonb, v.content::jsonb, v.sort_order, TRUE,");
lines.push("  (EXTRACT(EPOCH FROM NOW())::bigint * 1000), (EXTRACT(EPOCH FROM NOW())::bigint * 1000)");
lines.push("FROM (VALUES");
program.forEach((p, i) => {
	const comma = i < program.length - 1 ? "," : "";
	lines.push(
		`  ('${esc(p.id)}', '${esc(p.title)}', '${esc(p.description)}', '${esc(p.date)}', ${dollarJson(p.halls)}, ${dollarJson(p.content)}, ${i * 10})${comma}`
	);
});
lines.push(") AS v(slug, title, description, date, halls, content, sort_order)");
lines.push("WHERE NOT EXISTS (SELECT 1 FROM program_days LIMIT 1);");
lines.push("");

lines.push("INSERT INTO tours (slug, name, type, description, price, image, content, sort_order, is_active, created_at, updated_at)");
lines.push("SELECT v.slug, v.name, v.type, v.description, v.price, v.image, v.content::jsonb, v.sort_order, TRUE,");
lines.push("  (EXTRACT(EPOCH FROM NOW())::bigint * 1000), (EXTRACT(EPOCH FROM NOW())::bigint * 1000)");
lines.push("FROM (VALUES");
tours.forEach((t, i) => {
	const comma = i < tours.length - 1 ? "," : "";
	lines.push(
		`  ('${esc(t.id)}', '${esc(t.name)}', '${esc(t.type)}', '${esc(t.description)}', ${Number(t.price)}, '${esc(t.image)}', ${dollarJson(t.content)}, ${i * 10})${comma}`
	);
});
lines.push(") AS v(slug, name, type, description, price, image, content, sort_order)");
lines.push("WHERE NOT EXISTS (SELECT 1 FROM tours LIMIT 1);");
lines.push("");

const out = join(root, "migrations", "006_content_seed.sql");
writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out}`);
