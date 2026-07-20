import { getPackages, getPartners } from "@/actions";
import AboutSection from "@/components/main/AboutSection";
import AdditionalEntertainments from "@/components/main/AdditionalEntertainments";
import HeroSection from "@/components/main/HeroSection";
import ParticipationPackages from "@/components/main/ParticipationPackages";
import Partners from "@/components/main/Partners";
import YandexMap from "@/components/main/YandexMap";
import { Divider } from "@mui/material";

export default async function Home() {
	const [partners, packages] = await Promise.all([getPartners(), getPackages()]);
	return (
		<>
			<HeroSection />
			<Divider sx={{ my: 4 }} />
			<AboutSection />
			<Divider sx={{ my: 4 }} />
			{packages.length > 0 && (
				<>
					<ParticipationPackages packages={packages} />
					<Divider sx={{ my: 4 }} />
				</>
			)}
			<AdditionalEntertainments />
			<Divider sx={{ my: 4 }} />
			{partners.length > 0 && (
				<>
					<Partners partners={partners} />
					<Divider sx={{ my: 4 }} />
				</>
			)}
			<YandexMap />
		</>
	);
}
