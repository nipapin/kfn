import AdminDashboard from "@/components/admin/AdminDashboard";
import { notFound } from "next/navigation";

interface DashboardSectionPageProps {
	params: Promise<{ section: string }>;
}

export default async function DashboardSectionPage({ params }: DashboardSectionPageProps) {
	const { section } = await params;
	if (section === "applications") {
		return <AdminDashboard />;
	}
	return notFound();
}
