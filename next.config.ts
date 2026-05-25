import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://kfn39.ru/**")]
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "25mb"
		}
	}
};

export default nextConfig;
