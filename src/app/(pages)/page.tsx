import AboutSection from "@/components/main/AboutSection";
import AdditionalEntertainments from "@/components/main/AdditionalEntertainments";
import HeroSection from "@/components/main/HeroSection";
import ParticipationPackages from "@/components/main/ParticipationPackages";
import Partners from "@/components/main/Partners";
import ToursSection from "@/components/main/ToursSection";
import YandexMap from "@/components/main/YandexMap";
import { Divider } from "@mui/material";

export default async function Home() {
	return (
		<>
			<HeroSection />
			<Divider sx={{ my: 4 }} />
			<AboutSection />
			<Divider sx={{ my: 4 }} />
			<ParticipationPackages />
			<Divider sx={{ my: 4 }} />
			<ToursSection />
			<Divider sx={{ my: 4 }} />
			<AdditionalEntertainments />
			<Divider sx={{ my: 4 }} />
			<Partners />
			<Divider sx={{ my: 4 }} />
			<YandexMap />
		</>
	);
}
