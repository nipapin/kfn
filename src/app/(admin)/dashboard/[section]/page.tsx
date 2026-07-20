import AdminDashboard from "@/components/admin/AdminDashboard";
import EntertainmentsAdmin from "@/components/admin/EntertainmentsAdmin";
import PackagesAdmin from "@/components/admin/PackagesAdmin";
import PartnersAdmin from "@/components/admin/PartnersAdmin";
import ProgramAdmin from "@/components/admin/ProgramAdmin";
import ToursAdmin from "@/components/admin/ToursAdmin";
import { notFound } from "next/navigation";

interface DashboardSectionPageProps {
	params: Promise<{ section: string }>;
}

export default async function DashboardSectionPage({ params }: DashboardSectionPageProps) {
	const { section } = await params;
	if (section === "applications") {
		return <AdminDashboard />;
	}
	if (section === "partners") {
		return <PartnersAdmin />;
	}
	if (section === "packages") {
		return <PackagesAdmin />;
	}
	if (section === "program") {
		return <ProgramAdmin />;
	}
	if (section === "entertainments") {
		return <EntertainmentsAdmin />;
	}
	if (section === "tours") {
		return <ToursAdmin />;
	}
	return notFound();
}
