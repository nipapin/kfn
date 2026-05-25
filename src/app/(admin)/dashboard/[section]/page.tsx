import AdminDashboard from "@/components/admin/AdminDashboard";
import PartnersAdmin from "@/components/admin/PartnersAdmin";
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
	return notFound();
}
