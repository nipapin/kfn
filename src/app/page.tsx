import AboutSection from "@/components/main/AboutSection";
import AdditionalEntertainments from "@/components/main/AdditionalEntertainments";
import HeroSection from "@/components/main/HeroSection";
import ParticipationPackages from "@/components/main/ParticipationPackages";
import Partners from "@/components/main/Partners";
import YandexMap from "@/components/main/YandexMap";

export default function Home() {
	return (
		<>
			<HeroSection />
			<AboutSection />
			<ParticipationPackages />
			<AdditionalEntertainments />
			<Partners />
			<YandexMap />
		</>
	);
}
