import { AppBar, Toolbar } from "@mui/material";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import "@/styles/navigation.css";

export default function Navigation({ isRegistered }: { isRegistered: boolean }) {
	return (
		<AppBar elevation={1}>
			<Toolbar id='navigation-toolbar'>
				<DesktopNavigation isRegistered={isRegistered} />
				<MobileNavigation isRegistered={isRegistered} />
			</Toolbar>
		</AppBar>
	);
}
