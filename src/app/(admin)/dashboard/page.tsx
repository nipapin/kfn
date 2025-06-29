import Authorisation from "@/components/admin/Authorisation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const cookiesList = await cookies();
	const token = cookiesList.get("kfntoken");
	if (!token) {
		return <Authorisation />;
	}
	redirect("/dashboard/applications");
}
