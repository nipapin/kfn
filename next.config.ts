import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://kfn39.ru/**")]
	}
};

export default nextConfig;
