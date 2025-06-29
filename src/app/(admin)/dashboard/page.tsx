import AdminDashboard from "@/components/admin/AdminDashboard";
import Authorisation from "@/components/admin/Authorisation";
import { cookies } from "next/headers";

export default async function DashboardPage() {
	const cookiesList = await cookies();
	const token = cookiesList.get("kfntoken");
	if (!token) {
		return <Authorisation />;
	}
	return <AdminDashboard />;
}
