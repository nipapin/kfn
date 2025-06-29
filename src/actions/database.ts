import pg from "pg";
const pool = new pg.Pool({
	database: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT)
});

export const query = async (text: string, params: any[]) => {
	try {
		const result = await pool.query(text, params);
		return result.rows;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
