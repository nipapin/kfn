import { AppBar, Toolbar } from "@mui/material";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import "@/styles/navigation.css";

export default function Navigation() {
	return (
		<AppBar elevation={1}>
			<Toolbar id='navigation-toolbar'>
				<DesktopNavigation />
				<MobileNavigation />
			</Toolbar>
		</AppBar>
	);
}
