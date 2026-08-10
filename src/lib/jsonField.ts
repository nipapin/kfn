export function parseJsonArray<T>(raw: T[] | string | null | undefined): T[] {
	if (Array.isArray(raw)) return raw;
	if (raw == null || raw === "") return [];
	try {
		const parsed = JSON.parse(String(raw));
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
