import type { NextConfig } from "next";

const remotePatterns: ConstructorParameters<typeof URL>[0][] = ["https://kfn39.ru/**"];
if (process.env.S3_URL) {
	try {
		const s3Host = new URL(process.env.S3_URL).host;
		remotePatterns.push(`https://${s3Host}/**`);
	} catch {
		// игнорируем некорректный S3_URL
	}
}

const nextConfig: NextConfig = {
	images: {
		remotePatterns: remotePatterns.map((p) => new URL(p))
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "25mb"
		}
	}
};

export default nextConfig;
