import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, "..", "migrations");

const pool = new pg.Pool({
	database: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false
});

async function migrate() {
	const client = await pool.connect();
	try {
		await client.query(`
			CREATE TABLE IF NOT EXISTS schema_migrations (
				name VARCHAR(255) PRIMARY KEY,
				executed_at TIMESTAMP NOT NULL DEFAULT NOW()
			)
		`);

		const files = readdirSync(migrationsDir)
			.filter((f) => f.endsWith(".sql"))
			.sort();

		for (const file of files) {
			const { rows } = await client.query("SELECT name FROM schema_migrations WHERE name = $1", [file]);
			if (rows.length > 0) {
				console.log(`[skip] ${file} (already applied)`);
				continue;
			}

			const sql = readFileSync(join(migrationsDir, file), "utf8");
			console.log(`[run]  ${file}`);
			await client.query("BEGIN");
			try {
				await client.query(sql);
				await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
				await client.query("COMMIT");
				console.log(`[ok]   ${file}`);
			} catch (err) {
				await client.query("ROLLBACK");
				console.error(`[fail] ${file}`);
				throw err;
			}
		}

		console.log("All migrations applied.");
	} finally {
		client.release();
		await pool.end();
	}
}

migrate().catch((err) => {
	console.error(err);
	process.exit(1);
});
